import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingIndicator from "../../components/LoadingIndicator";
import { NavLink } from "react-router-dom";
import { REACT_APP_API_URL } from "../../router";



function UserManagementScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/api/users/all`);
      setData(data.users);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(user) {
    setEditUserId(user.id);
    setEditValues({
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.locationData ? user.locationData.name : "",
      department: user.department,
      status: user.status,
    });
    console.log("Editing user:", user);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  async function handleSaveChanges(id) {
    console.log("Preparing payload for user update:", editValues);

    const payload = {
      name: editValues.name,
      email: editValues.email,
      role: editValues.role,
      number: editValues.number,
      status: editValues.status,
    };

    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/users/${id}`,
        payload
      );
      console.log("Response from server:", response);
      setEditUserId(null);
      getDataFromApi(); // Refresh data
    } catch (e) {
      console.error("Error during PATCH request:", e);
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-left mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">User Management Screen</h1>
        <p className="text-lg text-gray-600 mt-2">
          Here are the Users created by you!
        </p>
      </div>

      {/* Add Create User Button */}
      <div className="mb-8">
        <NavLink
          className="text-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-md"
          to="new"
        >
          Create User
        </NavLink>
      </div>

      <div className="border rounded-md border-gray-300">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-teal-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    <LoadingIndicator />
                  </td>
                </tr>
              ) : (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-teal-50 hover:text-teal-700"
                  >
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editValues.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="email"
                          value={editValues.email}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="role"
                          value={editValues.role}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="location"
                          value={editValues.location}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.location
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="department"
                          value={editValues.department}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.department
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="number"
                          value={editValues.number}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.number
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <input
                          type="text"
                          name="status"
                          value={editValues.status}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                        />
                      ) : (
                        user.status
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editUserId === user.id ? (
                        <button
                          className="text-green-600 hover:text-green-700 font-semibold"
                          onClick={() => handleSaveChanges(user.id)}
                        >
                          Save Changes
                        </button>
                      ) : (
                        <button
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit User
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagementScreen;
