import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-indigo-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-teal-400 mb-4">Bricks & Clicks</h3>
                        <p className="text-indigo-200 mb-4">
                            Your trusted partner in finding the perfect property for your needs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-indigo-300 hover:text-teal-400 transition-colors">
                                <FaFacebook className="text-2xl" />
                            </a>
                            <a href="#" className="text-indigo-300 hover:text-teal-400 transition-colors">
                                <FaTwitter className="text-2xl" />
                            </a>
                            <a href="#" className="text-indigo-300 hover:text-teal-400 transition-colors">
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a href="#" className="text-indigo-300 hover:text-teal-400 transition-colors">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-teal-400 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-indigo-200 hover:text-teal-400 transition-colors">Home</a></li>
                            <li><a href="/search" className="text-indigo-200 hover:text-teal-400 transition-colors">Properties</a></li>
                            <li><a href="/about" className="text-indigo-200 hover:text-teal-400 transition-colors">About Us</a></li>
                            <li><a href="/contact" className="text-indigo-200 hover:text-teal-400 transition-colors">Contact</a></li>
                            <li><a href="/blog" className="text-indigo-200 hover:text-teal-400 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-teal-400 mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-indigo-200 hover:text-teal-400 transition-colors">Property Search</a></li>
                            <li><a href="#" className="text-indigo-200 hover:text-teal-400 transition-colors">Rental Management</a></li>
                            <li><a href="#" className="text-indigo-200 hover:text-teal-400 transition-colors">Investment Advice</a></li>
                            <li><a href="#" className="text-indigo-200 hover:text-teal-400 transition-colors">Buyer Representation</a></li>
                            <li><a href="#" className="text-indigo-200 hover:text-teal-400 transition-colors">Home Valuation</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-teal-400 mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-indigo-200">123 Real Estate Ave, Suite 100<br />New York, NY 10001</p>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-teal-400 mr-3" />
                                <a href="tel:+1234567890" className="text-indigo-200 hover:text-teal-400 transition-colors">(123) 456-7890</a>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-teal-400 mr-3" />
                                <a href="mailto:info@bricksandclicks.com" className="text-indigo-200 hover:text-teal-400 transition-colors">info@bricksandclicks.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-indigo-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-indigo-300 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Bricks & Clicks. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-indigo-300 hover:text-teal-400 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-indigo-300 hover:text-teal-400 text-sm transition-colors">Terms of Service</a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}