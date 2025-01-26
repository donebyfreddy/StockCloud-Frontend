import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FiCloudOff } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-400 to-blue-500 text-white">
      <FiCloudOff className="text-9xl mb-6 animate-pulse" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! The page you are looking for doesn't exist.</p>
      <Link
        to="/admin/dashboard"
        className="flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 hover:text-white transition-all duration-300"
      >
        <FaHome className="mr-2 text-2xl" />
        Return to Home
      </Link>
      <div className="absolute bottom-10 w-full text-center text-sm opacity-75">
        <p>IVMS StockCloud © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
