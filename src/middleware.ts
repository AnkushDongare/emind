import { NextResponse, NextRequest } from "next/server";
import { handlers, auth } from "@/auth"
export const { GET, POST } = handlers

const protectedRoutes = ["/middleware", "/dashboard", "/tests", "/book-appointment"];

export default async function middleware(request: NextRequest) {
    const session = await auth();

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (!session && isProtected) {
        const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
