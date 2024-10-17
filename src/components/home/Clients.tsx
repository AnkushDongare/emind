import Image from "next/image";

const clients = [
    { src: "/images/clients/educator-akka.png", alt: "Educator Akka" },
    { src: "/images/clients/little-pots.png", alt: "Little Pots" },
    { src: "/images/clients/neuron-hospital.png", alt: "Neuron Hospital" },
    { src: "/images/clients/nidhyana.png", alt: "Nidhyana Clinic" },
    { src: "/images/clients/ram-aastha.png", alt: "Ram Astha" },
    { src: "/images/clients/resilience.png", alt: "Resilience" },
    { src: "/images/clients/sheela-dang.png", alt: "Sheela Dang" },
    { src: "/images/clients/the-school-academy.png", alt: "The School Academy" },
];

export default function Clients() {
    return (
        <div className="bg-white pb-24 sm:pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                    Trusted by the world&apos;s most innovative teams
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {clients.map((client, index) => (
                        <Image
                            key={index}
                            alt={client.alt}
                            src={client.src}
                            width={158}
                            height={48}
                            loading="lazy"
                            className="col-span-2 max-h-auto w-full object-contain lg:col-span-1 rounded-3xl shadow-xl transition-transform transform hover:scale-105 duration-500 mx-auto md:mx-0"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
