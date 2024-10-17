import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { auth } from "@/auth";

// GET all patients, patient by ID
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Handle GET by ID for Patient model
            const patient = await prisma.patient.findUnique({ where: { id } });
            if (!patient) {
                return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
            }
            return NextResponse.json(patient);
        } else {
            // Handle GET all patients
            const patients = await prisma.patient.findMany();
            return NextResponse.json(patients);
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json({ message: 'Error fetching patients' }, { status: 500 });
    }
}

// POST new patient
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const newPatient = await request.json();
        const createdPatient = await prisma.patient.create({ data: newPatient });
        return NextResponse.json(createdPatient, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating patient' }, { status: 500 });
    }
}


// PUT update patient
export async function PUT(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const updatedPatient = await request.json();
        const { id, ...updateData } = updatedPatient;

        const existingPatient = await prisma.patient.findUnique({ where: { id } });
        if (!existingPatient) {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }

        const updated = await prisma.patient.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating patient:', error);
        return NextResponse.json({ message: 'Error updating patient' }, { status: 500 });
    }
}

// DELETE patient
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await request.json();

        const existingPatient = await prisma.patient.findUnique({ where: { id } });
        if (!existingPatient) {
            return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
        }

        await prisma.patient.delete({ where: { id } });
        return NextResponse.json({ message: 'Patient deleted' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        return NextResponse.json({ message: 'Error deleting patient' }, { status: 500 });
    }
}
