"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CodeForm = () => {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Handles form submission and code verification
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/codes?code=${encodeURIComponent(code)}`, {
                method: 'GET', // Ensures the method is GET for querying data
                headers: {
                    'Content-Type': 'application/json', // Optional for GET but a good practice
                },
            });

            const result = await response.json();

            if (response.ok) {
                // On successful response, navigate to the relevant test page
                // console.log(result);
                localStorage.setItem('test', JSON.stringify(result));
                router.push(`/tests/${result.test}/instructions`);
            } else {
                console.error("Code validation failed:", result);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
                <h2 className="text-xl font-semibold text-center">Enter your code</h2>
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Code form">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Code:
                    </label>
                    <Input
                        type="text"
                        id="code"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        aria-required="true"
                        aria-describedby="code-description"
                    />
                    <p id="code-description" className="text-sm text-gray-500">
                        Please enter the code provided to you.
                    </p>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {loading ? "Submitting..." : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CodeForm;
