import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { auth } from "@/auth";
import nodemailer from "nodemailer";
import { generateTestSubmissionConfirmationEmail } from '@/emails/templates/testSubmissionConfermation';

// Create the transporter for SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Replace with your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
});

// GET all tests or test by ID
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Handle GET by ID for Test model
            const test = await prisma.testResponse.findUnique({ where: { id } });
            if (!test) {
                return NextResponse.json({ message: 'Test not found' }, { status: 404 });
            }
            return NextResponse.json(test);
        } else {
            // Handle GET all tests
            const tests = await prisma.testResponse.findMany();
            return NextResponse.json(tests);
        }
    } catch (error) {
        console.error('Error fetching tests:', error);
        return NextResponse.json({ message: 'Error fetching tests' }, { status: 500 });
    }
}

// POST new test
export async function POST(request: NextRequest) {
    const session = await auth();

    try {
        const newTest = await request.json();
        const createdTest = await prisma.testResponse.create({
            data: {
                userId: newTest.userId,
                test: newTest.test,
                response: newTest.response,
            },
        });

        // Delete the test code after submission
        await prisma.code.delete({
            where: {
                code: newTest.test.code
            }
        });

        // Create result link
        const resultLink = `${process.env.NEXTAUTH_URL}/tests/dpi/result/${createdTest.id}`;
        const html = generateTestSubmissionConfirmationEmail(resultLink)
        // Send email notification
        await transporter.sendMail({
            from: "contact@emindcafe.com",
            to: session?.user?.email || "contact@emindcafe.com",
            subject: "Test Submission Confirmation.",
            html,
        });

        return NextResponse.json(createdTest, { status: 201 });
    } catch (error) {
        console.error("Error creating test:", error);
        return NextResponse.json({ message: "Error creating test" }, { status: 500 });
    }
}

// PUT update test
export async function PUT(request: NextRequest) {
    try {
        const updatedTest = await request.json();
        const { id, ...updateData } = updatedTest;

        const existingTest = await prisma.testResponse.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        const updated = await prisma.testResponse.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating test:', error);
        return NextResponse.json({ message: 'Error updating test' }, { status: 500 });
    }
}

// DELETE test
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        const existingTest = await prisma.testResponse.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        await prisma.testResponse.delete({ where: { id } });
        return NextResponse.json({ message: 'Test deleted' });
    } catch (error) {
        console.error('Error deleting test:', error);
        return NextResponse.json({ message: 'Error deleting test' }, { status: 500 });
    }
}
