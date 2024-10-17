// /app/api/payment/verify/route.ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Handler for verifying Razorpay payment
export async function POST(req: NextRequest) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

        // Validate that all necessary fields are present
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate the expected signature using HMAC SHA256
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(body.toString())
            .digest("hex");

        // Compare signatures to verify the payment
        if (expectedSignature === razorpay_signature) {
            // Payment verification successful
            return NextResponse.json({
                success: true,
                message: "Payment verification successful",
                razorpay_payment_id,
            });
        } else {
            // Payment verification failed
            return NextResponse.json(
                { success: false, message: "Invalid payment signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ success: false, message: "Payment verification failed", error }, { status: 500 });
    }
}
