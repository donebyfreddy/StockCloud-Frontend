import React from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa"; // Icons for phone, email, and WhatsApp

const SupportScreen = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+34628603221"); // Replace with your actual WhatsApp number
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Support & Assistance</h1>
        <p className="text-lg text-gray-600 mt-2">
          Need help? We're here to assist you with anything you need!
        </p>
      </div>

      {/* Help Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">FAQs</h2>
          <p className="text-lg text-gray-700">
            Have a look at our frequently asked questions to find quick answers to your queries.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li className="text-gray-600">How do I reset my password?</li>
            <li className="text-gray-600">How can I upgrade my account?</li>
            <li className="text-gray-600">What is the refund policy?</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Guides</h2>
          <p className="text-lg text-gray-700">
            Check out our comprehensive guides to help you make the most of our services.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li className="text-gray-600">How to set up your account</li>
            <li className="text-gray-600">Managing notifications</li>
            <li className="text-gray-600">Troubleshooting common issues</li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-10 bg-teal-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Contact Me</h2>
        <p className="text-lg text-gray-700 mb-4">
          If you can't find the answers you're looking for, feel free to reach out to me directly. I'll be happy to help!
        </p>
        <div className="flex flex-col items-center">
          {/* WhatsApp Link */}
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 p-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700"
          >
            <FaWhatsapp size={24} />
            <span className="text-lg">Contact via WhatsApp</span>
          </button>

          {/* Other Contact Options */}
          <div className="mt-4 flex space-x-6">
            <a href="tel:+34 628603221" className="flex items-center gap-2 text-teal-600">
              <FaPhoneAlt size={20} />
              <span>Call Us</span>
            </a>
            <a href="mailto:support@stockcloud.com" className="flex items-center gap-2 text-teal-600">
              <FaEnvelope size={20} />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;
