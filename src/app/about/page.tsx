import { Metadata } from 'next';
import OurMission from './OurMission';
import OurApproach from './OurApproach';
import OurValues from './OurValues';
import Services from '@/components/home/Services';
import AppointmentPlans from '../book-appointment/page';


export const metadata: Metadata = {
    metadataBase: new URL('https://emindcafe.com'),
    generator: 'emindcafe.com',
    applicationName: 'eMind Cafe',
    referrer: 'origin-when-cross-origin',
    keywords: ['Mental Health', 'Wellness', 'About Us'],
    authors: [
        { name: 'Akshay Shriwas' }
    ],
    creator: 'eMind Cafe',
    publisher: 'eMind Cafe',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    title: {
        default: 'About Us | eMind Cafe',
        template: '%s | eMind Cafe',
    },
    description: 'Discover eMind Cafe, a dedicated mental health care clinic focused on providing compassionate support, therapy, and resources for emotional well-being.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: {
            default: 'About Us | eMind Cafe',
            template: '%s | eMind Cafe',
        },
        type: 'website',
        description: 'Discover eMind Cafe, a dedicated mental health care clinic focused on providing compassionate support, therapy, and resources for emotional well-being.',
        url: 'https://emindcafe.com/about',
        siteName: 'eMind Cafe',
        images: [
            {
                url: 'https://emindcafe.com/og-about.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: 'About Us | eMind Cafe',
            template: '%s | eMind Cafe',
        },
        description: 'Discover eMind Cafe, a dedicated mental health care clinic focused on providing compassionate support, therapy, and resources for emotional well-being.',
        images: [
            'https://emindcafe.com/twitter-about-image.jpeg',
        ],
    },
};


const AboutPage = () => {
    return (
        <main className="bg-gradient-to-r from-purple-50 to-indigo-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                    About eMind Cafe
                </h1>
                <OurMission />
                <Services />
                <OurApproach />
                <AppointmentPlans />
                <OurValues />
            </div>
        </main>
    );
}

export default AboutPage;
