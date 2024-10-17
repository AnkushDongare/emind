import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
// import { auth } from "@/auth";

// GET all appointments, appointment by ID
export async function GET(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Handle GET by ID for Service model
            const service = await prisma.appointment.findUnique({ where: { id } });
            if (!service) {
                return NextResponse.json({ message: 'Service not found' }, { status: 404 });
            }
            return NextResponse.json(service);
        } else {
            // Handle GET all appointments
            const appointments = await prisma.appointment.findMany();
            return NextResponse.json(appointments);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching appointments' }, { status: 500 });
    }
}

// POST new appointment
export async function POST(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const newAppointment = await request.json();
        const createdAppointment = await prisma.appointment.create({ data: newAppointment });
        return NextResponse.json(createdAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating appointment' }, { status: 500 });
    }
}

// PUT update appointment
export async function PUT(request: NextRequest) {
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

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
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

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
