import React, { useEffect, useState } from "react";
import EmptyData from "../assets/undraw_empty_re.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { REACT_APP_API_URL } from "../router";



function WarrantyExpiringProductsTablesComponent({ uid }) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/api/devices/warranty_6months`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Ensure that data.devices is an array
      setInventoryData(Array.isArray(data.devices) ? data.devices : []);
      setLoading(false);
    } catch (error) {
      console.error("Great no devices are going to lose warranty:", error);
      setError("Fantastic! No devices are at risk of losing their warranty.");
      setLoading(false);
    }
  };

  const calculateMonthsDifference = (date1, date2) => {
    const diffInMs = new Date(date2) - new Date(date1);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24 * 30.44)); // Approximate number of days in a month
  };

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {isError}</div>
      ) : inventoryData.length === 0 ? (
        <div className="flex items-center justify-center">
          <img src={EmptyData} alt="Empty Data" className="w-24 h-auto" />
          <h3>No data available</h3>
        </div>
      ) : (
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Warranty Months / Purchase Date
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.title}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.serialNo}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.warrantyMonths} / {item.dateOfPurchase ? item.dateOfPurchase.split("T")[0] : 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {
                      item.history && item.history[0] && item.history[0].status && item.history[0].status[0]
                        ? item.history[0].status[0].name
                        : 'No status available'
                    }
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    <Link to={`/products/history/${item._id}`} className="text-blue-500 hover:underline mr-2">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default WarrantyExpiringProductsTablesComponent;
