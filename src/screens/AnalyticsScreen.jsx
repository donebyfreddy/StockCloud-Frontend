import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import LoadingIndicator from "../components/LoadingIndicator";
import { REACT_APP_API_URL } from "../router";
import { FaChartPie, FaChartBar } from "react-icons/fa";
import Chart from "chart.js/auto"; // Import Chart.js

function AnalyticsScreen() {
  const [deviceData, setDeviceData] = useState([]); // Default to empty array
  const [userData, setUserData] = useState([]); // Default to empty array
  const [storageData, setStorageData] = useState([]); // Default to empty array
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const barChartRef = useRef(null);
  const pieChartRef1 = useRef(null);
  const pieChartRef2 = useRef(null);

  useEffect(() => {
    fetchAnalyticsData();
    return () => {
      // Cleanup the charts when component is unmounted
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      if (pieChartRef1.current) {
        pieChartRef1.current.destroy();
      }
      if (pieChartRef2.current) {
        pieChartRef2.current.destroy();
      }
    };
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      console.log("Fetching device data...");
      const deviceResponse = await axios.get(`${REACT_APP_API_URL}/api/devices/types/count`, { withCredentials: true });
      console.log("Device data:", deviceResponse.data.devices); // Ensure accessing the right property
  
      console.log("Fetching user data...");
      const userResponse = await axios.get(`${REACT_APP_API_URL}/api/users/locations/count`, { withCredentials: true });
      console.log("User data:", userResponse.data.users); // Ensure accessing the right property
  
      console.log("Fetching storage data...");
      const storageResponse = await axios.get(`${REACT_APP_API_URL}/api/storages/locations/count`, { withCredentials: true });
      console.log("Storage data:", storageResponse.data.storages); // Ensure accessing the right property
  
      setDeviceData(deviceResponse.data.devices || []); // Ensure it's an empty array if no data
      setUserData(userResponse.data.users || []); // Ensure it's an empty array if no data
      setStorageData(storageResponse.data.storages || []); // Ensure it's an empty array if no data
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching analytics data. Please try again later.");
      console.error("Error fetching analytics data:", error.response || error.message || error);
    }
  };

  const prepareDeviceChartData = () => {
    if (!Array.isArray(deviceData) || deviceData.length === 0) {
      return { labels: ['No Data'], datasets: [{ label: "Device Types", data: [0], backgroundColor: "#4caf50" }] };
    }

    return {
      labels: deviceData.map((item) => item.type),
      datasets: [
        {
          label: "Device Types",
          data: deviceData.map((item) => item.count),
          backgroundColor: "#4caf50",
        },
      ],
    };
  };

  const prepareUserChartData = () => ({
    labels: userData.length > 0 ? userData.map((item) => item.location) : ['No Data'],
    datasets: [
      {
        label: "Users per Location",
        data: userData.length > 0 ? userData.map((item) => item.count) : [0],
        backgroundColor: "#2196f3",
      },
    ],
  });

  const prepareStorageChartData = () => ({
    labels: storageData.length > 0 ? storageData.map((item) => item.locationName) : ['No Data'],
    datasets: [
      {
        label: "Storages per Location",
        data: storageData.length > 0 ? storageData.map((item) => item.count) : [0],
        backgroundColor: "#ff9800",
      },
    ],
  });
  
  const renderNoDataMessage = (data, chartType) => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4">
          <p>No data available for {chartType}</p>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="h-full w-full px-10 py-6 bg-gray-100">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Analytics Overview</h1>
        <p className="text-xl text-gray-600">Insights into your devices, users, and storage distributions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Device Types Distribution</h2>
          <Bar ref={barChartRef} data={prepareDeviceChartData()} options={{ responsive: true }} />
          {renderNoDataMessage(deviceData, "Device Types")}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users by Location</h2>
          <Pie ref={pieChartRef1} data={prepareUserChartData()} options={{ responsive: true }} />
          {renderNoDataMessage(userData, "Users")}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Storages by Location</h2>
          <Pie ref={pieChartRef2} data={prepareStorageChartData()} options={{ responsive: true }} />
          {renderNoDataMessage(storageData, "Storages")}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsScreen;
