"use client";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = {
    name: string;
    email: string;
    message: string;
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setStatus(null);
        setErrorMessage(null);

        try {
            contactSchema.parse(formData); // Validate form data

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message. Please try again later.');
            }

            setStatus('success');
            setFormData({ name: "", email: "", message: "" }); // Reset form
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0] as string] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                const errorMsg = error instanceof Error ? error.message : 'Something went wrong.';
                setStatus('error');
                setErrorMessage(errorMsg);
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Contact Form
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            placeholder="Your Name"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Email"
                            required
                        />
                    </label>
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Message"
                            rows={5}
                            required
                        ></textarea>
                    </label>
                    {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md shadow-md hover:shadow-lg transition duration-300"
                >
                    Submit
                </button>
                {status === 'success' && <p className="text-green-500 mt-2">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ContactForm;
