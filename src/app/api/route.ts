import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ message: "This is a API services by eMind Cafe Mental Healthcare. Do Not use this API without concent on personal websites." });
    } catch (error) {
        return NextResponse.json({ message: "Error during authentication" }, { status: 500 });
    }
}
