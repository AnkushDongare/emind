// pages/contact.tsx
import { Metadata } from 'next';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import ContactForm from './ContactForm'; // Adjust the path as necessary

const branches = [
    {
        id: "1",
        title: "Registered Office",
        location: "Akola",
        address: "eMindCafe Mental Health Care Services, A/11, Sharddha Residency, Bitiset Agrawal Layout, Near Badere Photo Studio, Devi Khadan, Hingna Fata Post Office, Gandhi Nagar, Akola, Maharashtra 444001",
        phone: "+91 9607144154"
    },
    {
        id: "2",
        location: "Mumbai",
        address: "eMindCafe Mental Health Care Services, Swami Vivekananda Rd, opp. Vijay Sales, Goregaon West, Mumbai, Maharashtra 400104",
        phone: "+91 9607144154"
    },
    {
        id: "3",
        location: "Aurangabad",
        address: "eMindCafe Mental Health Care Services, Swara Sapnangan Near Hurman Pharmaceutical Main Gate, Shendra MIDC, Aurangabad, Maharashtra 431007",
        phone: "+91 9607144154"
    }
];

const soonIn = [
    { name: "Pune" },
    { name: "Nasik" },
    { name: "Nagpur" },
    { name: "Buldhana" }
];

export const metadata: Metadata = {
    metadataBase: new URL('https://emindcafe.com'),
    generator: 'emindcafe.com',
    applicationName: 'eMind Cafe',
    referrer: 'origin-when-cross-origin',
    keywords: ['Mental Health', 'Contact Us', 'Counseling', 'Therapy'],
    authors: [
        { name: 'eMind Cafe' }
    ],
    creator: 'eMind Cafe',
    publisher: 'eMind Cafe',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    title: {
        default: 'Contact Us | eMind Cafe',
        template: '%s | eMind Cafe',
    },
    description: 'Reach out to eMind Cafe for inquiries, support, and mental health services. We are dedicated to helping you on your journey to wellness.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: {
            default: 'Contact Us | eMind Cafe',
            template: '%s | eMind Cafe',
        },
        type: 'website',
        description: 'Reach out to eMind Cafe for inquiries, support, and mental health services. We are dedicated to helping you on your journey to wellness.',
        url: 'https://emindcafe.com/contact',
        siteName: 'eMind Cafe',
        images: [
            {
                url: 'https://emindcafe.com/og-contact.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: 'Contact Us | eMind Cafe',
            template: '%s | eMind Cafe',
        },
        description: 'Reach out to eMind Cafe for inquiries, support, and mental health services. We are dedicated to helping you on your journey to wellness.',
        images: [
            'https://emindcafe.com/twitter-contact-image.jpeg',
        ],
    },
};


const ContactPage = () => {

    return (
        <main className="bg-gradient-to-r from-purple-50 to-indigo-50 pt-40">
            <section className="container mx-auto py-16 px-4 md:px-8 lg:px-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600">We&apos;re here to help. Reach out to us with any questions, concerns, or to schedule an appointment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    {/* Contact Form */}
                    <ContactForm />

                    {/* Clinic Information */}
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Clinic Information</h2>
                        <div className="mb-4">
                            <p className="font-semibold text-gray-800">Main Office/HQ, Panvel</p>
                            <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-2 text-blue-500" /> eMindCafe Mental Health Care Services, Neuron Psychiatric Hospital, near Church, Adarsh Nagar, Palaspa, Panvel, Kudave, Maharashtra 410221</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold text-gray-800">Phone:</p>
                            <p className="text-gray-600"><FaPhoneAlt className="inline mr-2 text-blue-500" /><a href="tel:+919607144154">+91 960-714-4154</a></p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold text-gray-800">Email:</p>
                            <p className="text-gray-600"><FaEnvelope className="inline mr-2 text-blue-500" /><a href="mailto:info@emindcafe.com">info@emindcafe.com</a></p>
                        </div>
                    </div>
                </div>

                {/* Branches Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Our Branches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {branches.map((branch) => {
                            const { id, title, location, address, phone } = branch;
                            return (
                                <div key={id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{location}</h3>
                                    <p className="text-gray-800"><strong>{title ? title : "Branch"}</strong></p>
                                    <p className="text-gray-600"><b>Address: </b>{address}</p>
                                    <p className="text-gray-600"><b>Phone: </b>{phone}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Opening Soon Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Opening Soon In Your City</h2>
                    <p className="text-lg text-gray-600 text-center mb-6">But no worry, contact us by scheduling an appointment online.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {soonIn.map((city) => {
                            const { name } = city;
                            return (
                                <div key={name} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactPage;
