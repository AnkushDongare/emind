import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust based on your actual component path
import { cn } from "@/lib/utils";

const doctors = [
    {
        name: "Sai S.",
        specialization: "Founder, Mentor, Financial Strategist, Growth Leader",
        experience: "Sai, the visionary founder of eMindCafe Mental Health Care Services, serves as the guiding force and inspiration behind the company’s growth and success. Her dedication to improving mental health care, combined with her strategic financial acumen, has driven the development of innovative services and platforms that transform lives. As a mentor to the eMindCafe team, Sai fosters an environment of continuous growth, encouraging both personal and professional development. Her leadership in finance and strategic planning ensures the company’s sustained growth, making eMindCafe a trusted name in the mental health industry. Through her unwavering vision, Sai continues to inspire the entire team to deliver excellence in every aspect of care.",
        image: "/images/team/sai.jpg",
    },
    {
        name: "Mr Shubham Shriwas",
        specialization: "Director, Strategic Visionary, Disaster Management Instructor",
        experience: "As Director of Operations and Strategy at eMindCafe, Mr. Shubham Shriwas, with a diploma in Disaster Management and a certification as a ToT instructor, leads the company’s visionary efforts in expanding its mental health care reach. With over 5 years of experience, he has a keen understanding of operational architecture, ensuring efficient service delivery. His strategic insight guides the company’s growth in both the mental health and disaster management sectors, bridging the gap between public welfare and mental health services.",
        image: "/images/team/shubham-shriwas.jpg",
    },
    {
        name: "Dr. Sangram Dhalgade, MBBS, MD (Psychiatry)",
        specialization: "Chairperson, Psychiatrist, Advisory Board Leader",
        experience: "Dr. Sangram Dhalgade is a highly skilled psychiatrist with over 12 years of experience in clinical psychiatry, leading eMindCafe’s advisory board. As the Chairperson, he ensures evidence-based strategies are implemented across mental health services. His expertise in mental health treatments and policy planning strengthens eMindCafe’s commitment to providing holistic care and cutting-edge psychometric assessments. Dr. Dhalgade’s leadership empowers the team to deliver innovative, patient-centric solutions.",
        image: "/images/team/dr-sangram-dhalgade.jpg",
    },
    {
        name: "Dr. Akshay Shriwas, RCI Certified",
        specialization: "Consultant Psychologist, Rehabilitation Counselor, Operations Head",
        experience: "Dr. Akshay Shriwas brings over 5 years of expertise as a consultant psychologist and rehabilitation counselor, holding RCI certification. As the Operational Head of eMindCafe, he leads the execution of clinical services, online counseling platforms, and psychometric assessments. Dr. Shriwas's innovative approach to mental health care integrates technology with evidence-based practices, ensuring that clients receive personalized, high-quality support. His dedication ensures seamless service delivery across all eMindCafe’s platform",
        image: "/images/team/dr-akshay-shriwas.jpg",
    },
    {
        name: "Dr Nitin Patil",
        specialization: "Senior Psychologist, Research & Development Expert",
        experience: "Dr. Nitin Patil, with more than 20 years of experience in psychology and research, heads eMindCafe's Research and Development team. He drives groundbreaking research initiatives, shaping policy and mental health strategies that set industry standards. His profound knowledge of psychological testing and interventions ensures that eMindCafe offers scientifically validated, top-tier services. Dr. Patil's work in behavioral research strengthens our ability to offer precise, personalized care for diverse mental health needs.",
        image: "/images/team/dr-nitin-patil.jpg",
    },
    {
        name: "Ms Vikranti Kanth",
        specialization: "Manager, Social Case Worker, Mediation Expert",
        experience: "Ms. Vikranti Kanth brings vast experience in social case work and mediation, currently leading Public Affairs at eMindCafe. As Manager of Social Services, she ensures communityfocused mental health initiatives and mediation services run effectively. Ms. Kanth’s strong background in case work and community outreach supports eMindCafe’s goal of providing accessible mental health services, especially to underserved populations. Her mediation expertise strengthens the company's public engagement and dispute resolution capabilities.",
        image: "/images/team/vikranti-kanth.jpg",
    },
    {
        name: "Dr. Sheela Dang, RCI Certified",
        specialization: "Consultant Psychologist, Rehabilitation Counselor, Managing Director",
        experience: "Dr. Sheela Dang is a dedicated psychologist and rehabilitation counselor with 11 years of experience, holding RCI certification. As Managing Director and a key member of the advisory committee, she oversees operational strategies, ensuring that eMindCafe’s services align with the highest ethical and professional standards. Dr. Dang’s specialization in rehabilitation counseling makes her a cornerstone of eMindCafe’s focus on long-term mental health recovery and support.",
        image: "/images/team/dr-sheela-dang.jpg",
    },
    {
        name: "Ms. Namrata Joshi",
        specialization: "Testing, Research & Development Specialist, MSc Computer Science",
        experience: "Ms. Namrata Joshi, with an MSc in Computer Science and over 2 years of experience, specializes in software testing and research development. Her focus on optimizing eMindCafe’s digital platform ensures the highest quality in client experience and data security. Ms. Joshi plays an integral role in enhancing user-friendly solutions, combining technology with mental health care. Her contribution to research ensures eMindCafe stays at the forefront of innovation.",
        image: "/images/team/namrata-joshi.jpg",
    }
];

const Team = () => {
    return (
        <section
            id="team"
            className={cn(
                "pt-20 py-20 md:py-28 bg-gradient-to-r from-purple-50 via-indigo-100 to-indigo-50"
            )}
        >
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.slice(0, 4).map((doctor, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            <Image
                                src={doctor.image}
                                alt={`${doctor.name} - ${doctor.specialization}`}
                                className="w-full h-96 object-cover rounded-t-lg mb-4"
                                height={500}
                                width={500}
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {doctor.name}
                                </h3>
                                <p className="text-gray-600 mb-4">{doctor.specialization}</p>
                                <p className="text-gray-700 leading-relaxed">{doctor.experience.slice(0, 150)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Link href="/team" passHref>
                        <Button
                            variant="default"
                            aria-label="View More Team Members"
                        >
                            View More Team Members
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Team;
