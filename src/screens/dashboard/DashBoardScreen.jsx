import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WarrantyExpiringProductsTableComponent from "../../components/WarrantyExpiringProductsTableComponent";
import { FaBox, FaChartBar, FaCalendarAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { BsArrowUpRight } from "react-icons/bs";
import LoadingIndicator from "../../components/LoadingIndicator";
import { REACT_APP_API_URL } from "../../router";




function DashBoardScreen() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/devices/count`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data); // Update state with the entire data object
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const StatsCard = ({ icon: Icon, title, value, link }) => (
    <div className="bg-white rounded-lg shadow-xl p-6 hover:bg-teal-50 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div className="text-3xl text-teal-600">
          <Icon />
        </div>
        <div className="text-right">
          <h5 className="text-xl font-semibold text-gray-700">{title}</h5>
          <p className="text-lg font-semibold text-gray-500">{value}</p>
        </div>
      </div>
      {link && (
        <Link to={link} className="text-teal-600 text-right mt-2 block">
          View More
        </Link>
      )}
    </div>
  );

  return (
    <div className="h-full w-full px-10 py-6 bg-gray-100">
      {/* Title Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-xl text-gray-600">Your personalized overview of the latest data.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard icon={FaBox} title="Total Devices" value={data.totalDevices || 0} />
        <StatsCard icon={FaChartBar} title="Analytics" value="View Details" link="/admin/analytics" />
        <StatsCard icon={FaCalendarAlt} title="Upcoming Expirations" value={data.upcomingExpirations || 0} />
        <StatsCard icon={IoIosSettings} title="System Settings" value="Manage Settings" link="/settings" />
      </div>

      {/* Warranty Expiring Products */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Warranty Expiring Products</h2>
        <WarrantyExpiringProductsTableComponent />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        <Link to="/admin/devices" className="bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="text-3xl">
              <FaBox />
            </div>
            <div className="text-right">
              <h5 className="text-xl font-semibold">View All Devices</h5>
              <p className="text-lg">See your full device list</p>
            </div>
            <BsArrowUpRight className="text-2xl text-teal-100" />
          </div>
        </Link>

        <Link to="/admin/analytics" className="bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="text-3xl">
              <FaChartBar />
            </div>
            <div className="text-right">
              <h5 className="text-xl font-semibold">View Analytics</h5>
              <p className="text-lg">Analyze performance metrics</p>
            </div>
            <BsArrowUpRight className="text-2xl text-teal-100" />
          </div>
        </Link>

        <Link to="/expirations" className="bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="text-3xl">
              <FaCalendarAlt />
            </div>
            <div className="text-right">
              <h5 className="text-xl font-semibold">Expirations</h5>
              <p className="text-lg">Track upcoming expirations</p>
            </div>
            <BsArrowUpRight className="text-2xl text-teal-100" />
          </div>
        </Link>

        <Link to="/settings" className="bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="text-3xl">
              <IoIosSettings />
            </div>
            <div className="text-right">
              <h5 className="text-xl font-semibold">Settings</h5>
              <p className="text-lg">Manage your settings</p>
            </div>
            <BsArrowUpRight className="text-2xl text-teal-100" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashBoardScreen;
