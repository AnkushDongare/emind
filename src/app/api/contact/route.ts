import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";

// POST contact form submission
export async function POST(request: NextRequest) {
    try {
        // Extract the JSON body from the request
        const { name, email, message } = await request.json();

        // Validate the required fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Create the transporter for SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com', // Replace with your SMTP server
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send the email
        await transporter.sendMail({
            from: "contact@emindcafe.com",
            to: 'emindcafe@gmail.com', // Your email address
            subject: `Contact Form Submission from ${name}`,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
        });

        // Return success response
        return NextResponse.json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        // Return error response
        return NextResponse.json({ message: 'Failed to send message. Please try again later.' }, { status: 500 });
    }
}
