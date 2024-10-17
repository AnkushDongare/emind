'use client'; // Since it's a client component

import { useEffect, useState } from 'react';

type Service = {
    id: string;
    name: string;
    slug: string;
    type: string;
    // Add other fields based on your schema
};

export default function Home() {
    const [services, setServices] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services', { cache: 'force-cache' }); // Ensure caching on the server side as well  
            if (!response.ok) throw new Error("Failed to fetch services");

            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
            setError("Failed to fetch services.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        fetchServices();

    }, []);

    if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="container mx-auto pt-40 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Available Services</h1>
            {services.length === 0 ? (
                <p className="text-gray-500 text-center">No services available</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <li key={service.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                            <p className="text-gray-600 mb-1">
                                <span className="font-bold">Type: </span>{service.type}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-bold">Slug: </span>{service.slug}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
