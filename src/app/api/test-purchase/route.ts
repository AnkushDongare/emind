import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { auth } from "@/auth";

// GET all tests, test by ID
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const userId = url.searchParams.get('userId');

        if (id) {
            // Handle GET by ID for Test model
            const test = await prisma.testPurchase.findUnique({ where: { id } });
            if (test) {
                return NextResponse.json(test);
            } else {
                return NextResponse.json({ message: 'Test not found' }, { status: 404 });
            }
        } else if (userId) {
            // Handle GET by userId for Test model
            const tests = await prisma.testPurchase.findMany({ where: { userId } });
            return NextResponse.json(tests);
        } else {
            // Handle GET all tests
            if (session.user.role !== "ADMIN") {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            const tests = await prisma.testPurchase.findMany();
            return NextResponse.json(tests);
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        return NextResponse.json({ message: 'Error fetching tests' }, { status: 500 });
    }
}

// POST new appointment
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { userId, orderId, name, email, contact, age, gender, test } = await request.json();
        // Validate input here
        if (!userId || !orderId || !name || !email || !contact) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const createdAppointment = await prisma.testPurchase.create({
            data: {
                userId,
                orderId,
                name,
                email,
                contact,
                age,
                gender,
                test
            },
        });
        return NextResponse.json(createdAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating appointment' }, { status: 500 });
    }
}
// PUT update test
export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedTest = await request.json();
        const { id, ...updateData } = updatedTest;

        const existingTest = await prisma.testPurchase.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        const updated = await prisma.testPurchase.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating test' }, { status: 500 });
    }
}

// DELETE test
export async function DELETE(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await request.json();

        const existingTest = await prisma.testPurchase.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        await prisma.testPurchase.delete({ where: { id } });
        return NextResponse.json({ message: 'Test deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting test' }, { status: 500 });
    }
}
