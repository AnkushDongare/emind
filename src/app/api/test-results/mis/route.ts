import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/prisma'; // Adjust the path as needed
import { categories } from '@/app/tests/mis/assessment/english';
import { auth } from '@/auth';

// Define an interface for the response structure
interface ResponseType {
    [key: number]: number; // Index signature for number keys
}

// Inside your GET function
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (id) {
            // Fetch the test response
            const test = await prisma.testResponse.findUnique({ where: { id } });
            if (!test) {
                return NextResponse.json({ message: 'Test not found' }, { status: 404 });
            }

            // Check if response exists and is an object
            const response = test.response as ResponseType; // Assert type, but ensure it is not null or undefined

            if (response == null || typeof response !== 'object') {
                return NextResponse.json({ message: 'Response is invalid or not found' }, { status: 400 });
            }

            const result: { [key: string]: number } = {}; // Result object to store category sums

            categories.forEach(category => {
                const questionsInCategory = category.questions;
                let sum = 0;

                questionsInCategory.forEach(question => {
                    // Use the number type for indexing
                    if (response[question] !== undefined) {
                        sum += response[question]; // Sum the response value
                    }
                });

                const percentage = Math.round((sum / 10) * 100)

                if (sum > 0) {
                    result[category.name] = percentage; // Store the sum for the category
                }
            });
            const { test: testInfo } = test;
            return NextResponse.json({ testInfo, results: result });
        }

        return NextResponse.json({ message: 'No ID provided' }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching tests' }, { status: 500 });
    }
}
