import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// API route handler for payment order creation
export async function POST(req: NextRequest) {
    try {
        const { amount, currency, receipt } = await req.json();

        if (!amount || !currency || !receipt) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            receipt,
        };

        // Create Razorpay order
        const order = await razorpay.orders.create(options);
        return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { success: false, message: "Error creating order", error },
            { status: 500 }
        );
    }
}

// Handle other HTTP methods
export function GET() {
    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}
