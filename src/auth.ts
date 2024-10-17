import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Apple from "next-auth/providers/apple"
import { Role } from "@prisma/client"

// Extend NextAuth types
declare module "next-auth" {
    interface Session {
        user: User; // Extend the Session user property
    }

    interface User {
        role: Role; // Include the role
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub, Apple],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 86400,
    },
    callbacks: {
        async session({ session, token }) {
            // Add the userId from the token to the session object
            if (session.user) {
                session.user.id = token.sub as string;
                session.user.email = token.email as string;
                session.user.role = token.role as Role;             }
            return session;
        },
        async jwt({ token, user }) {
            // When a user signs in, add their ID to the token
            if (user) {
                token.sub = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        }
    },
    trustHost: true
})