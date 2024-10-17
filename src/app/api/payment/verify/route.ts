import { prisma } from "@/prisma";
import otpGenerator from "@/utils/otpGenerator";
import sendMail from "@/utils/sendMail";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { generatePurchaseConfirmationEmail } from "@/emails/templates/purchaseConfirmation";
import { generateTestPurchaseConfirmationEmail } from "@/emails/templates/testPurchaseConfirmationEmail";
const otp = otpGenerator();

// Handler for verifying Razorpay payment
export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userId,
            amount,
            currency,
            orderId,
            type,
            test,
        } = await req.json();

        // Validate that all necessary fields are present
        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature ||
            !userId ||
            !amount ||
            !currency ||
            !orderId ||
            !type
        ) {
            console.error("Missing required fields:", {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                userId,
                amount,
                currency,
                orderId,
                type,
            });
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate the expected signature using HMAC SHA256
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(body)
            .digest("hex");

        // Compare signatures to verify the payment
        if (expectedSignature === razorpay_signature) {
            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.error("User not found:", userId);
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }

            // Payment verification successful
            await prisma.payment.create({
                data: {
                    userId,
                    orderId,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpayOrderId: razorpay_order_id,
                    razorpaySignature: razorpay_signature,
                    amount,
                    currency,
                    type,
                    status: "COMPLETE",
                },
            });

            if (type === 'TEST') {
                const html = generateTestPurchaseConfirmationEmail(otp,razorpay_payment_id)
                await prisma.code.create({
                    data: {
                        userId,
                        code: otp,
                        test,
                    },
                });
                sendMail({
                    mailTo: user?.email, // The recipient's email
                    subject: 'Test Purchase Confirmation Email',
                    html
                });
            }
            if (type === 'APPOINTMENT') {
                const html = generatePurchaseConfirmationEmail(razorpay_payment_id)
                sendMail({
                    mailTo: user?.email, // The recipient's email
                    subject: 'Appointment Confirmation Email',
                    html
                });
            }
            return NextResponse.json({
                success: true,
                message: "Payment successful",
                razorpay_payment_id,
            });

        } else {
            // Payment verification failed
            console.error("Invalid payment signature:", {
                expectedSignature,
                razorpay_signature,
            });
            return NextResponse.json(
                { success: false, message: "Invalid payment signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Payment verification failed:", error);
        return NextResponse.json(
            { success: false, message: "Payment verification failed", error: error },
            { status: 500 }
        );
    }
}
