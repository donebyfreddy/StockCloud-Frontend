import React from 'react';
import { Link } from 'react-router-dom'; 

const admin = 'admin';

const HeaderSettings = () => {
  return (
    <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg p-4">
      <ul className="space-y-2">
        <li><Link to={`/${admin}/users/profile`} className="text-gray-800 hover:text-gray-600">Profile</Link></li>
        <li><Link to={`/${admin}/settings`} className="text-gray-800 hover:text-gray-600">Settings</Link></li>
        <li><Link to={`/${admin}/logout`} className="text-gray-800 hover:text-gray-600">Logout</Link></li>
      </ul>
    </div>
  );
};

export default HeaderSettings;
