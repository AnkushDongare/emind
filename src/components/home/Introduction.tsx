import { cn } from "@/lib/utils";
import Image from "next/image";
import image from "@/images/welcoming-clinic-space.jpeg"

export default function Introduction() {
    return (
        <section
            id="about"
            className={cn(
                "py-20 md:py-28 bg-gradient-to-r from-purple-50 via-indigo-100 to-indigo-50"
            )}
        >
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2 mb-10 md:mb-0">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
                            About Us
                        </h2>
                        <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700">
                            We understand that taking the first step towards seeking mental health support can feel overwhelming. At eMind Cafe, we provide a safe, compassionate, and confidential space where you can feel understood and supported on your path to healing and growth.
                        </p>
                        <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700">
                            Our team of experienced therapists specializes in evidence-based treatments for anxiety, depression, trauma, stress, and other mental health issues. We believe in a holistic approach to wellness, addressing both the mind and body to promote long-term healing and resilience.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            Discover a place where you are heard, empowered, and equipped with the tools you need to thrive. Let eMind Cafe be your haven in the pursuit of mental wellness.
                        </p>
                    </div>

                    {/* Image Content */}
                    <div className="lg:w-1/2 flex justify-center md:justify-end">
                        <Image
                            src={image} // Image URL goes here
                            alt="A calming and inviting therapy room at eMind Cafe"
                            className="rounded-3xl shadow-xl transition-transform transform hover:scale-105 duration-500 mx-auto md:mx-0"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}