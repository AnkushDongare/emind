import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
// import { auth } from "@/auth";

// GET all products, or product by ID
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Handle GET by ID for Product model
            const product = await prisma.product.findUnique({ where: { id } });
            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json(product);
        } else {
            // Handle GET all products
            const products = await prisma.product.findMany();
            return NextResponse.json(products);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

// POST new product
export async function POST(request: NextRequest) {
    try {
        const newProduct = await request.json();
        const createdProduct = await prisma.product.create({ data: newProduct });
        return NextResponse.json(createdProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
    }
}

// PUT update product
export async function PUT(request: NextRequest) {
    try {
        const updatedProduct = await request.json();
        const { id, ...updateData } = updatedProduct;

        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const updated = await prisma.product.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        await prisma.product.delete({ where: { id } });
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
