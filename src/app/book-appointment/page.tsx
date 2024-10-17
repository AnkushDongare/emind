"use client";

import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';
import { Service } from '@prisma/client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AppointmentPlans() {
    const [selectedType, setSelectedType] = useState('INDIVIDUAL');
    const [services, setServices] = useState<Service[]>([]); // Explicitly set type
    const [loading, setLoading] = useState(true);
    const serviceTypes = ['INDIVIDUAL', 'COUPLE'];
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`/api/services?type=${selectedType}`,);
                const data = await response.json();

                // Ensure data is an array
                if (Array.isArray(data)) {
                    setServices(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setServices([]);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [selectedType]);

    const handleTypeChange = (type: SetStateAction<string>) => {
        setSelectedType(type);
    };

    return (
        <section
            id="pricing"
            className={cn(
                "py-40 md:py-40 bg-gradient-to-r from-purple-50 via-indigo-100 to-indigo-50"
            )}
        >
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
                    Choose Your Appointment Plan
                </h2>

                {/* Service Type Buttons */}
                <div className="flex justify-center mb-12 gap-4">
                    {serviceTypes.map((type) => (
                        <Button
                            key={type}
                            className={cn(
                                "px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300",
                                selectedType === type
                                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                    : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                            )}
                            onClick={() => handleTypeChange(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    ))}
                </div>

                {/* Services Display */}
                {loading ? (
                    <p className="text-center text-lg text-gray-600">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
                                >
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
                                        {service.name}
                                    </h3>
                                    <p className="text-gray-700 text-center mb-4">
                                        {service.sessions} Sessions
                                    </p>
                                    <p className="text-gray-800 font-semibold text-center mb-4 text-xl">
                                        Price: ₹{service.price}
                                    </p>
                                    <p className="text-gray-700 text-center mb-6">
                                        Per Session Price: ₹{service.perSessionPrice}
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mb-6">
                                        {service.features && service.features.map((feature) => (
                                            <li key={feature}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/book-appointment/${service.slug}`}
                                        passHref
                                    >
                                        <Button
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-md mt-auto transition-all duration-300"
                                        >
                                            Book Now
                                        </Button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-lg text-gray-600">No appointment plans available.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}