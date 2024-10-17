import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { ServiceType } from '@prisma/client';
import { auth } from "@/auth";

// GET all services, service by ID, or services by name
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const name = url.searchParams.get('name');
        const slug = url.searchParams.get('slug');
        const type = url.searchParams.get('type');

        if (id) {
            // Handle GET by ID for Service model
            const service = await prisma.service.findUnique({ where: { id } });
            if (!service) {
                return NextResponse.json({ message: 'Service not found' }, { status: 404 });
            }
            return NextResponse.json(service);
        } else if (name) {
            // Handle GET by name for Service model
            const services = await prisma.service.findMany({
                where: { name: { contains: name, mode: 'insensitive' } }
            });
            return NextResponse.json(services);
        } else if (slug) {
            // Handle GET by name for Service model
            const services = await prisma.service.findUnique({ where: { slug } }
            );
            return NextResponse.json(services);
        } else if (type) {
            const services = await prisma.service.findMany({
                where: { type: type as ServiceType }
            });
            return NextResponse.json(services);
        } else {
            // Handle GET all services
            const services = await prisma.service.findMany({});
            return NextResponse.json(services);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching services' }, { status: 500 });
    }
}

// POST new service
export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const newService = await request.json();
        const createdService = await prisma.service.create({ data: newService });
        return NextResponse.json(createdService, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating service', error }, { status: 500 });
    }
}

// PUT update service
export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedService = await request.json();
        const { id, ...updateData } = updatedService;

        const existingService = await prisma.service.findUnique({ where: { id } });
        if (!existingService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        const updated = await prisma.service.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating service' }, { status: 500 });
    }
}

// DELETE service
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

        const existingService = await prisma.service.findUnique({ where: { id } });
        if (!existingService) {
            return NextResponse.json({ message: 'Service not found' }, { status: 404 });
        }

        await prisma.service.delete({ where: { id } });
        return NextResponse.json({ message: 'Service deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting service' }, { status: 500 });
    }
}