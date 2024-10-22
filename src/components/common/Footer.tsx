import Image from "next/image";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter, FaFacebook, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-blue-950 text-white">
            {/* Footer Top */}
            <div className="footer-top py-4 text-center">
                <p className="text-lg px-4">मन एव मनुष्याणां कारणं बन्धमोक्षयोः।</p>
            </div>
            <hr />
            {/* Footer Main */}
            <div className="footer-main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-4 md:px-16">
                {/* Logo Section */}
                <div className="logo-section text-center sm:text-left">
                    <Image src="/images/icons/apple-touch-icon-152x152.png" alt="Logo" width={152} height={152} className="w-auto h-auto"/>
                    <p className="text-sm mt-4">Be blesses with mindful future.</p>
                </div>

                {/* Important Links 1 */}
                <div className="links-section text-center sm:text-left">
                    <h2 className="text-lg font-semibold mb-4">Important Links</h2>
                    <ul>
                        <li><a href="/" className="text-sm hover:underline">Home</a></li>
                        <li><a href="/about" className="text-sm hover:underline">About</a></li>
                        <li><a href="/services" className="text-sm hover:underline">Services</a></li>
                        <li><a href="/contact" className="text-sm hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Important Links 2 */}
                <div className="links-section text-center sm:text-left">
                    <h2 className="text-lg font-semibold mb-4">More Links</h2>
                    <ul>
                        <li><a href="/team" className="text-sm hover:underline">Our Team</a></li>
                        <li><a href="tests" className="text-sm hover:underline">Take a Test Now</a></li>
                        <li><a href="book-appointment" className="text-sm hover:underline">Book Appointment</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="links-section sm:text-left text-center ">
                    <h2 className="text-lg font-semibold mb-4">Social Links</h2>
                    <ul className="flex justify-center sm:justify-start gap-4">
                        <li>
                            <Link href="https://whatsapp.com/channel/0029Va4ywsI2ZjCrew6qjh0J" className="text-sm hover:text-yellow-400"
                                aria-label="Whatsapp"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaWhatsapp className="w-10 h-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/emindcafe/" className="text-sm hover:text-yellow-400"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer">
                                <InstagramLogoIcon className="w-10 h-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://twitter.com/emindcafe/" className="text-sm hover:text-yellow-400"
                                aria-label="X"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaXTwitter className="w-10 h-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.facebook.com/eMindCafeMentalHealthCareServices/" className="text-sm hover:text-yellow-400"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaFacebook className="w-10 h-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://in.linkedin.com/company/emindcafementalhealthcare/" className="text-sm hover:text-yellow-400"
                                aria-label="Linkedin"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaLinkedin className="w-10 h-10" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/@emindcafementalhealthcare/" className="text-sm hover:text-yellow-400"
                                aria-label="Youtube"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaYoutube className="w-10 h-10" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom bg-gray-700 py-4 text-center">
                <p className="text-xs">&copy; {currentYear} eMind Cafe Mental Health Care Pvt Ltd. All rights reserved.</p>
                <p className="text-xs">Designed and Developed by Ankush Dongre.</p>
            </div>
        </footer>
    );
}

export default Footer;
