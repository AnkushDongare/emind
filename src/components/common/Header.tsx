"use client"
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Logout from './Logout'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Appointment', href: '/book-appointment' },
    { name: 'Buy Test', href: '/tests' },
]

export default function Header() {
    const { data: session, status } = useSession()

    return (
        <header className="absolute inset-x-0 top-0 z-50 bg-white shadow-sm">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="nav">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/logos/eMind-Cafe-logo-300x100.png"
                            alt="Company Logo"
                            width={150}
                            height={50}
                            className="h-auto w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                    {!session ?
                        null
                        :
                        (
                            <Link href="/dashboard" className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                                Dashboard
                            </Link>
                        )
                    }
                </div>

                {/* Log In / Logout for Desktop */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {status === 'loading' ? null : !session ? (
                        <Link href="/sign-in" className="text-sm font-semibold text-indigo-600 hover:underline">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    ) : (
                        <Logout />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open mobile menu">
                                <FaBars className="h-6 w-6 text-gray-900" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="p-6 bg-white">
                            <SheetTitle hidden>eMind Cafe</SheetTitle>
                            <SheetDescription hidden>
                                Menu
                            </SheetDescription>
                            <SheetHeader>
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="flex items-center space-x-2">
                                        <Image
                                            src="/images/logos/eMind-Cafe-logo-300x100.png"
                                            alt="Company Logo"
                                            width={150}
                                            height={50}
                                            className="h-auto w-auto"
                                        />
                                    </Link>
                                    <Button variant="ghost" size="icon" aria-label="Close mobile menu">
                                    </Button>
                                </div>
                            </SheetHeader>

                            {/* Mobile Navigation */}
                            <div className="mt-6 space-y-4">
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className="block text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                                        {item.name}
                                    </Link>
                                ))}
                                {session ? (
                                    <>
                                        <Link href="/dashboard" className="block text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
                                            Dashboard
                                        </Link>
                                        <Logout /> {/* Only render when logged in */}
                                    </>
                                ) : (
                                    <Link href="/sign-in" className="block text-base font-medium text-indigo-600 hover:underline px-3 py-2">
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </nav>
        </header>
    )
}
