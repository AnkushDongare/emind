import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { auth } from "@/auth";

// GET all appointments, appointment by ID
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId'); // Adjusted to fetch by userId

        if (userId) {
            // Handle GET by userId
            const appointments = await prisma.appointment.findMany({ where: { userId } });
            return NextResponse.json(appointments);
        } else {
            if (session.user.role !== "ADMIN") {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            // Handle GET all appointments
            const appointments = await prisma.appointment.findMany();
            return NextResponse.json(appointments);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Error fetching appointments' }, { status: 500 });
    }
}

// POST new appointment
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { userId, orderId, name, email, contact, date, time } = await request.json();
        // Validate input here
        if (!userId || !orderId || !name || !email || !contact || !date || !time) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const createdAppointment = await prisma.appointment.create({
            data: {
                userId,
                orderId,
                name,
                email,
                contact,
                date: new Date(date),
                time,
                status: "SCHEDULED",
            },
        });
        return NextResponse.json(createdAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating appointment' }, { status: 500 });
    }
}

// PUT update appointment
export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedAppointment = await request.json();
        const { id, ...updateData } = updatedAppointment;

        const existingAppointment = await prisma.appointment.findUnique({ where: { id } });
        if (!existingAppointment) {
            return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating appointment' }, { status: 500 });
    }
}

// DELETE appointment
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

        const existingAppointment = await prisma.appointment.findUnique({ where: { id } });
        if (!existingAppointment) {
            return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
        }

        await prisma.appointment.delete({ where: { id } });
        return NextResponse.json({ message: 'Appointment deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting appointment' }, { status: 500 });
    }
}
