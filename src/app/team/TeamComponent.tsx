"use client";
import Image from 'next/image';
import { Card, CardHeader, CardDescription } from '@/components/ui/card';
// import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { teamMembers } from '@/data/data';
// import Link from 'next/link';

const TeamComponent = () => {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
                <Card key={index} className="team-member bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <Image
                        src={member.image}
                        alt={`${member.name}'s photo`}
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                    <CardHeader className="p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-600">{member.specialization}</p>
                    </CardHeader>
                    <CardDescription className="px-6 pb-4 text-gray-700">
                        {member.experience}
                    </CardDescription>
                    {/* Add mt-auto to push the footer to the bottom */}
                    {/* <CardFooter className="px-6 pb-6 mt-auto flex justify-start">
                        <Link
                            href="https://www.linkedin.com"
                            passHref
                            className="text-blue-950 hover:text-blue-500 px-2"
                            aria-label="LinkedIn Profile"
                            role="link"
                        >
                            <FaLinkedin className="text-3xl" />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            passHref
                            className="text-blue-950 hover:text-blue-500 px-2"
                            aria-label="Twitter Profile"
                            role="link"
                        >
                            <FaXTwitter className="text-3xl" />
                        </Link>
                    </CardFooter> */}
                </Card>
            ))}
        </div>
    )
}

export default TeamComponent;
