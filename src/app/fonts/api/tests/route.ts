import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
// import { auth } from "@/auth";

// GET all tests, test by ID
export async function GET(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const slug = url.searchParams.get('slug');

        if (id) {
            // Handle GET by ID for Test model
            const test = await prisma.test.findUnique({ where: { id } });
            if (!test) {
                return NextResponse.json({ message: 'Test not found' }, { status: 404 });
            }
            return NextResponse.json(test);
        } else if (slug) {
            // Handle GET by name for Service model
            const services = await prisma.test.findUnique({ where: { slug } }
            );
            return NextResponse.json(services);
        } else {
            // Handle GET all tests
            const tests = await prisma.test.findMany();
            return NextResponse.json(tests);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching tests' }, { status: 500 });
    }
}

// POST new test
export async function POST(request: NextRequest) {
    try {
        // const session = await auth();
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const newTest = await request.json();
        const createdTest = await prisma.test.create({ data: newTest });
        return NextResponse.json(createdTest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating test' }, { status: 500 });
    }
}

// PUT update test
export async function PUT(request: NextRequest) {
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const updatedTest = await request.json();
        const { id, ...updateData } = updatedTest;

        const existingTest = await prisma.test.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        const updated = await prisma.test.update({
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
    // const session = await auth();
    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const { id } = await request.json();

        const existingTest = await prisma.test.findUnique({ where: { id } });
        if (!existingTest) {
            return NextResponse.json({ message: 'Test not found' }, { status: 404 });
        }

        await prisma.test.delete({ where: { id } });
        return NextResponse.json({ message: 'Test deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting test' }, { status: 500 });
    }
}
