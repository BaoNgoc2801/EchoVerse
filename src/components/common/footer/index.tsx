import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-teal-800 via-green-900 to-black text-white">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16">
                {/* Top curved border effect */}
                <div className="w-full flex justify-center mb-10">
                    <div className="h-1 w-32 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-full"></div>
                </div>

                <div className="flex flex-col mb-12 text-sm lg:flex-row lg:justify-between lg:items-start lg:text-left text-center gap-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center lg:items-start mb-10 lg:mb-0 lg:w-1/3">
                        <div className="flex items-center mb-4">
                            <img
                                src="/image/logo.png"
                                className="w-10 h-10"
                                alt="EchoVerse Logo"
                            />
                            <h2 className="text-2xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300">
                                EchoVerse
                            </h2>
                        </div>
                        <p className="w-full md:w-2/3 text-gray-400 leading-relaxed">
                            Your gateway to live streaming. We bring you the latest and most
                            exciting live content from around the world with stunning quality.
                        </p>

                        {/* Newsletter signup */}
                        <div className="mt-6 w-full md:w-4/5">
                            <p className="text-emerald-300 mb-2">Subscribe to our newsletter</p>
                            <div className="flex mt-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-teal-900/30 text-white rounded-l-md py-2 px-4 w-full focus:outline-none border border-emerald-700/50"
                                />
                                <button className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white py-2 px-4 rounded-r-md hover:from-green-500 hover:via-emerald-600 hover:to-teal-700">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between lg:w-2/3">
                        <div className="flex-1">
                            <p className="text-xl font-semibold mb-4 text-teal-300">Learn more</p>
                            <ul className="flex flex-col gap-3 text-gray-400">
                                <li className="hover:text-emerald-300 cursor-pointer transition-colors">
                                    About EchoVerse
                                </li>
                                <li className="hover:text-green-300 cursor-pointer transition-colors">
                                    Contact us
                                </li>
                                <li className="hover:text-green-300 cursor-pointer transition-colors">
                                    Privacy Policy
                                </li>
                                <li className="hover:text-green-300 cursor-pointer transition-colors">
                                    Terms of Service
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="flex-1">
                            <p className="text-xl font-semibold mb-4 text-green-300">Contact</p>
                            <ul className="flex flex-col gap-3 text-gray-400">
                                <li>123 EchoVerse Ave.</li>
                                <li>Media City, Innovation District</li>
                                <li>Phone: (123) 456-7890</li>
                                <li>Email: support@echoverse.com</li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div className="flex-1">
                            <p className="text-xl font-semibold mb-4 text-green-300">Follow Us</p>
                            <ul className="flex justify-center lg:justify-start gap-4">
                                <li>
                                    <div className="p-2 rounded-full bg-gradient-to-br from-green-500 to-teal-700 hover:from-green-400 hover:to-teal-600 transition-all">
                                        <a
                                            href="#"
                                            aria-label="Facebook"
                                            className="text-white"
                                        >
                                            <FaFacebookF />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="p-2 rounded-full bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 transition-all">
                                        <a
                                            href="#"
                                            aria-label="Twitter"
                                            className="text-white"
                                        >
                                            <FaTwitter />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="p-2 rounded-full bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 transition-all">
                                        <a
                                            href="#"
                                            aria-label="LinkedIn"
                                            className="text-white"
                                        >
                                            <FaLinkedinIn />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="p-2 rounded-full bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 transition-all">
                                        <a
                                            href="#"
                                            aria-label="Instagram"
                                            className="text-white"
                                        >
                                            <FaInstagram />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="border-t border-teal-800/50 text-center py-6 text-gray-500">
                    &copy; 2025 EchoVerse. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;