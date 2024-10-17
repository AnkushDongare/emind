// import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const myServices = [
    {
        id: 1,
        title: "Psychological Counselling",
        description: "Explore the depths of your mind and emotions through our expert psychological counselling services. Our seasoned professionals provide a safe and supportive environment for you to navigate life's challenges. Whether you're grappling with anxiety, depression, or simply seeking personal growth, our tailored approach empowers you to unlock insights and develop effective coping strategies. Take the first step towards healing and self-discovery today.",
    },
    {
        id: 2,
        title: "Psychiatric Consultation",
        description: "Our psychiatric consultation service offers comprehensive assessment and treatment for individuals facing mental health concerns. Led by board-certified psychiatrists, our team provides compassionate care tailored to your unique needs. Whether you're struggling with mood disorders, psychotic symptoms, or medication management, we're here to offer support and guidance. Our goal is to help you regain stability, improve your quality of life, and move forward with confidence. Schedule a consultation today and take the first step towards mental wellness.",
    },
    {
        id: 3,
        title: "Psychometric Assessment",
        description: "Dive deep into understanding your personality, abilities, and aptitudes with our precise psychometric assessment services. Utilizing scientifically validated tools and methodologies, our experienced psychologists offer insights into your strengths, weaknesses, and potential career paths. Whether you're exploring educational options, seeking career guidance, or aiming for personal development, our assessments provide valuable insights to guide your decision-making process. Empower yourself with a clear understanding of your unique traits and capabilities. Schedule a psychometric assessment today and embark on a journey of self-discovery and fulfillment.",
    },
    {
        id: 4,
        title: "Peer Support Programs",
        description: "Join our peer support programs and find solace, understanding, and encouragement in a community of individuals navigating similar life challenges. Facilitated by trained peers who have walked similar paths, these programs provide a non-judgmental space where you can share experiences, gain insights, and receive empathy and support. Whether you're coping with mental health issues, addiction recovery, or life transitions, our peer support programs offer a sense of belonging and empowerment. Connect with others who truly understand and embark on a journey of healing and growth together.",
    },
    {
        id: 5,
        title: "Individual and Family Counselling",
        description: "Our individual and family counselling services offer a confidential and compassionate space for you and your loved ones to address a wide range of emotional and relational challenges. Our experienced therapists provide personalized support tailored to your unique needs, whether you're struggling with communication breakdowns, conflict resolution, grief, or other stressors. Through evidence-based techniques and a strengths-based approach, we empower individuals and families to navigate life's complexities, build resilience, and foster healthier relationships. Take the first step towards healing and harmony by scheduling a counselling session today.",
    },
    {
        id: 6,
        title: "Group Therapy",
    },
    {
        id: 7,
        title: "Career Guidance",
    },
    {
        id: 8,
        title: "Life Coaching",
    },
    {
        id: 9,
        title: "Sex Education and Therapy",
    },
    {
        id: 10,
        title: "Online Counseling Platforms",
    },
    {
        id: 11,
        title: "Institutional and Corporate Training",
    },
    {
        id: 12,
        title: "Community Outreach Programs",
    },
    {
        id: 13,
        title: "Employee Mental Health Care Support",
    },
    {
        id: 14,
        title: "Services Workshops and Seminars",
    },
    {
        id: 15,
        title: "Observership",
    },
    {
        id: 16,
        title: "Internship",
    },
    {
        id: 17,
        title: "Therapy Classes",
    },
    {
        id: 18,
        title: "Psychometric Testing Classes"
    },
];

const Services = () => {
    return (
        <section
            id="services"
            className={cn(
                "py-20 md:py-28 bg-gradient-to-r from-purple-50 via-indigo-100 to-indigo-50"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
                    Our Mental Health Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myServices.slice(0, 4).map((service) => (
                        <div
                            key={service.id}
                            className={cn(
                                "bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
                            )}
                        >
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {service.description
                                    ? `${service.description.slice(0, 120)}...`
                                    : "Work one-on-one with a compassionate therapist to address various mental health challenges."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;