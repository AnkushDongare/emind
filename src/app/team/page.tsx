import { Metadata } from "next";
import TeamComponent from "./TeamComponent"

export const metadata: Metadata = {
    metadataBase: new URL('https://theschoolacademy.in'),
    generator: 'theschoolacademy.in',
    applicationName: 'The School Academy',
    referrer: 'origin-when-cross-origin',
    keywords: ['Education', 'Team', 'Staff', 'Our Team'],
    authors: [
        { name: 'Akshay Shriwas' }
    ],
    creator: 'Akshay Shriwas',
    publisher: 'Akshay Shriwas',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    title: {
        default: 'Our Team | The School Academy',
        template: '%s | The School Academy',
    },
    description: 'Meet the dedicated team behind The School Academy. Learn more about our staff and their commitment to providing exceptional educational services.',
    alternates: {
        canonical: '/team',
    },
    openGraph: {
        title: {
            default: 'Our Team | The School Academy',
            template: '%s | The School Academy',
        },
        type: 'website',
        description: 'Meet the dedicated team behind The School Academy. Learn more about our staff and their commitment to providing exceptional educational services.',
        url: 'https://theschoolacademy.in/team',
        siteName: 'The School Academy',
        images: [
            {
                url: 'https://theschoolacademy.in/og-team.png', // Use a specific image for the Team page
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: 'Our Team | The School Academy',
            template: '%s | The School Academy',
        },
        description: 'Meet the dedicated team behind The School Academy. Learn more about our staff and their commitment to providing exceptional educational services.',
        images: [
            'https://theschoolacademy.in/twitter-team-image.jpeg', // Use a specific image for the Team page
        ],
    },
};

const TeamPage = () => {
    return (
        <main>
            <section className="team pt-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h1>
                        <p className="text-lg text-gray-600">Our dedicated team of educators and professionals.</p>
                    </div>
                    <TeamComponent />
                </div>
            </section>
        </main>
    )
}
export default TeamPage