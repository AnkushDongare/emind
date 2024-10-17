import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
// import { auth } from "@/auth";

// GET all codes, code by ID
export async function GET(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Handle GET by ID for Code model
            const code = await prisma.code.findUnique({ where: { id } });
            if (!code) {
                return NextResponse.json({ message: 'Code not found' }, { status: 404 });
            }
            return NextResponse.json(code);
        } else {
            // Handle GET all codes
            const codes = await prisma.code.findMany();
            return NextResponse.json(codes);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching codes' }, { status: 500 });
    }
}

// POST new code
export async function POST(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const newCode = await request.json();
        const createdCode = await prisma.code.create({ data: newCode });
        return NextResponse.json(createdCode, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating code' }, { status: 500 });
    }
}

// PUT update code
export async function PUT(request: NextRequest) {
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const updatedCode = await request.json();
        const { id, ...updateData } = updatedCode;

        const existingCode = await prisma.code.findUnique({ where: { id } });
        if (!existingCode) {
            return NextResponse.json({ message: 'Code not found' }, { status: 404 });
        }

        const updated = await prisma.code.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating code' }, { status: 500 });
    }
}

// DELETE code
export async function DELETE(request: NextRequest) {
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const { id } = await request.json();

        const existingCode = await prisma.code.findUnique({ where: { id } });
        if (!existingCode) {
            return NextResponse.json({ message: 'Code not found' }, { status: 404 });
        }

        await prisma.code.delete({ where: { id } });
        return NextResponse.json({ message: 'code deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting code' }, { status: 500 });
    }
}
