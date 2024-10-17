"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Test } from '@prisma/client';

const TestPurchase = () => {
    const [services, setServices] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`/api/tests`);
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
    }, []);

    return (
        <section id="pricing" className="pt-40 md:py-40 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
                    Purchase Your Test
                </h2>

                {/* Services Display */}
                {loading ? (
                    <p className="text-center text-lg text-gray-600">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {services.length > 0 ? ( // Check if services are available
                            services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                                >
                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
                                        {service.name}
                                    </h3>
                                    <p className="text-gray-700 text-center mb-4">
                                        {service.description} Sessions
                                    </p>
                                    <p className="text-gray-800 font-semibold text-center mb-4 text-2xl">
                                        Price: ₹{service.price}
                                    </p>
                                    <Link
                                        href={`/tests/purchase/${service.slug}`}
                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-md mt-auto transition-all duration-300"
                                        passHref
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-lg text-gray-600">No services available.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestPurchase;
