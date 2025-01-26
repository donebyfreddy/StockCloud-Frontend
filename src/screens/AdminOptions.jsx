import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaCog, FaUserCog, FaFileAlt } from 'react-icons/fa';

const AdminOptions = () => {
  const sections = [
    {
      title: 'Ticketing',
      description: 'Options for configuring the ticketing system.',
      options: [
        { name: 'Create Ticket', icon: <FaTicketAlt />, link: '/admin/ticket/create' },
        { name: 'Manage Tickets', icon: <FaTicketAlt />, link: '/admin/ticket/manage' },
        { name: 'Ticket Reports', icon: <FaFileAlt />, link: '/admin/ticket/reports' },
        { name: 'Settings', icon: <FaCog />, link: '/admin/ticket/settings' },
      ],
    },
    {
      title: 'Asset Settings',
      description: 'Options for configuring asset settings.',
      options: [
        { name: 'Add Asset', icon: <FaCog />, link: '/admin/devices/new' },
        { name: 'Manage Assets', icon: <FaCog />, link: '/admin/devices' },
        { name: 'Asset Reports', icon: <FaFileAlt />, link: '/admin/assets/reports' },
        { name: 'Asset Settings', icon: <FaCog />, link: '/admin/assets/settings' },
      ],
    },
    {
      title: 'User Management',
      description: 'Options for managing users and roles.',
      options: [
        { name: 'Add User', icon: <FaUserCog />, link: '/admin/users/new' },
        { name: 'Manage Users', icon: <FaUserCog />, link: '/admin/users' },
        { name: 'User Roles', icon: <FaUserCog />, link: '/admin/users/roles' },
        { name: 'User Reports', icon: <FaFileAlt />, link: '/admin/users/reports' },
      ],
    },
    {
      title: 'Settings',
      description: 'Options for general system settings.',
      options: [
        { name: 'System Configuration', icon: <FaCog />, link: '/admin/settings/config' },
        { name: 'Notifications', icon: <FaCog />, link: '/admin/settings/notifications' },
        { name: 'Security Settings', icon: <FaCog />, link: '/admin/settings/security' },
        { name: 'Backup Settings', icon: <FaCog />, link: '/admin/settings/backup' },
      ],
    },
  ];

  return (
    <div className="space-y-12 px-8 py-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl">
      {sections.map((section, index) => (
        <div key={index} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-center text-teal-600 mb-6">{section.title}</h2>
          <p className="text-center text-gray-700 mb-8">{section.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.options.map((option, idx) => (
              <Link
                key={idx}
                to={option.link}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out hover:bg-teal-100 hover:shadow-xl"
              >
                <div className="text-4xl text-teal-500 mb-3">{option.icon}</div>
                <span className="font-semibold text-lg text-gray-800">{option.name}</span>
              </Link>
            ))}
          </div>
          <hr className="my-8 border-t-2 border-teal-300" />
        </div>
      ))}
    </div>
  );
};

export default AdminOptions;
