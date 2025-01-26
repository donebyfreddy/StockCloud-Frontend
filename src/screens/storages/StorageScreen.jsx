import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingIndicator from "../../components/LoadingIndicator";
import { NavLink } from "react-router-dom";
import { REACT_APP_API_URL } from "../../router";

function StorageScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editStorageId, setEditStorageId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", location: "", status: "" });

  useEffect(() => {
    getDataFromApi();
  }, []);

  async function getDataFromApi() {
    try {
      const { data } = await axios.get(`${REACT_APP_API_URL}/api/storages/all`);
      setData(data.storages);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(storage) {
    setEditStorageId(storage.id);
    setEditValues({
      name: storage.name,
      location: storage.locationData ? storage.locationData.name : '',
      status: storage.status,
    });
    console.log("Editing storage:", storage); // Debugging line
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  async function handleSaveChanges(id) {
    console.log("Preparing payload for storage update:", editValues);
    
    const payload = {
      name: editValues.name,
      description: editValues.description, // Ensure this field is passed
      status: editValues.status,
    };
  
    try {
      const response = await axios.patch(`${REACT_APP_API_URL}/api/storages/${id}`, payload);
      console.log("Response from server:", response); // Debugging line
      setEditStorageId(null);
      getDataFromApi(); // Refresh data
    } catch (e) {
      console.error("Error during PATCH request:", e); // Debugging line
    }
  }
  
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-left mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Storage</h1>
        <p className="text-lg text-gray-600 mt-2">
          Here are the Storages created by you!
        </p>
      </div>

      {/* Add Create Storage Button */}
      <div className="mb-8">
        <NavLink
          className="text-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-md"
          to="new"
        >
          Create Storage
        </NavLink>
      </div>

      <div className="border rounded-md border-gray-300">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-teal-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    <LoadingIndicator />
                  </td>
                </tr>
              ) : (
                data.map((storage) => (
                  <tr
                    key={storage.id}
                    className="border-b hover:bg-teal-50 hover:text-teal-700"
                  >
                    <td className="px-4 py-2">
                      {editStorageId === storage.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editValues.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        storage.name
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editStorageId === storage.id ? (
                        <input
                          type="text"
                          name="location"
                          value={editValues.location}
                          disabled
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        storage.locationData ? storage.locationData.name : 'Unknown'
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editStorageId === storage.id ? (
                        <input
                          type="text"
                          name="status"
                          value={editValues.status}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        storage.status
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editStorageId === storage.id ? (
                        <button
                          className="text-green-600 hover:text-green-700 font-semibold"
                          onClick={() => handleSaveChanges(storage.id)}
                        >
                          Save Changes
                        </button>
                      ) : (
                        <button
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                          onClick={() => handleEditClick(storage)}
                        >
                          Edit Storage
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

export default StorageScreen;
