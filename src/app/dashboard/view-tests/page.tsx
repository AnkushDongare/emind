"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Appointment {
    id: string;
    userId: string;
    orderId: string;
    name: string;
    email: string;
    test: string;
    contact: string;
}

export default function BookedAppointmentsList() {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!session?.user?.id) {
                setError('User ID is not available.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/test-purchase?userId=${session.user.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Appointment[] = await response.json();

                if (Array.isArray(data)) {
                    setAppointments(data);
                } else {
                    setError('Unexpected response format.');
                }
            } catch (error) {
                setError('Error fetching appointments.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="py-40">
            <Table>
                <TableCaption>A list of your recent purchased tests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Order ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Test</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.orderId}</TableCell>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                                <TableCell>{appointment.contact}</TableCell>
                                <TableCell>{appointment.test.toUpperCase()}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No purchased tests found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
