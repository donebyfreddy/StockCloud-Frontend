import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward, IoIosAdd } from 'react-icons/io';
import { REACT_APP_API_URL } from '../../router';
import LoadingIndicator from '../../components/LoadingIndicator';
import ShowErrorMessage from '../../components/ShowErrorMessage';
import { Link } from 'react-router-dom';

function AssetManagementScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [assignmentType, setAssignmentType] = useState('None'); // Default selection
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  // Fetch All Users / Storage Assignments
  const fetchData = async () => {
    try {
      setLoading(true);

      const endpoint =
        assignmentType === 'user'
          ? `${REACT_APP_API_URL}/api/assignments/users/all`
          : `${REACT_APP_API_URL}/api/assignments/storages/all`;

      const response = await axios.get(endpoint, {
        params: {
          page: currentPage,
          itemsPerPage,
        },
      });

      if (response.data.success) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setData([]);
        setTotalPages(0);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, assignmentType]);

  const handleAssignmentTypeChange = (event) => {
    setAssignmentType(event.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-gray-800">Asset Management</h1>

      <div className="mb-6">
        <label htmlFor="assignmentType" className="text-xl text-gray-600">
          Select Assignment Type
        </label>
        <select
          id="assignmentType"
          value={assignmentType}
          onChange={handleAssignmentTypeChange}
          className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="storage">Devices Assigned to Storage</option>
          <option value="user">Devices Assigned to Users</option>
        </select>
      </div>

      {error && <ShowErrorMessage message={error} />}

      <div className="flex justify-between mb-4">
        <Link
          to="/admin/asset_management/new"
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          <IoIosAdd className="text-xl" />
          <span>Create New Assignment</span>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-teal-50 text-gray-700 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">Serial Number</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Assignment</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  <LoadingIndicator />
                </td>
              </tr>
            ) : (
              data.map((item) => {
                // Determine whether to use User or Storage data
                const assignment =
                  assignmentType === 'user' ? item.User?.name : item.Storage?.name;
                const location = item.Device?.locationData?.name;
                  

                return (
                  <tr key={item.id} className="hover:bg-teal-100 transition">
                    <td className="px-6 py-4">{item.Device?.serial_number}</td>
                    <td className="px-6 py-4">{location || 'N/A'}</td>
                    <td className="px-6 py-4">{assignment || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <button className="text-teal-600 hover:text-teal-700 font-semibold">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-16 text-center border rounded-md"
          />
          <h5>Items Per Page</h5>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center border py-2 px-4 rounded-md text-lg font-semibold hover:bg-teal-50 hover:text-teal-700"
          >
            <IoIosArrowBack />
            Prev
          </button>

          <span className="text-lg">{`${currentPage} of ${totalPages}`}</span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center border py-2 px-4 rounded-md text-lg font-semibold hover:bg-teal-50 hover:text-teal-700"
          >
            Next
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssetManagementScreen;
