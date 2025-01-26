import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowSuccessMessage from "../../components/ShowErrorMessage"; // Corrected typo
import { REACT_APP_API_URL } from "../../router";



function NewUserScreen() {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    console.log(userLocations);
  }, [userLocations]);

  useEffect(() => {
    fetchNecessaryData();
  }, []);

  const fetchNecessaryData = async () => {
    try {
      const resLocations = await axios.get(`${REACT_APP_API_URL}/api/location/all`);
      const locations = resLocations.data;

      if (locations && Array.isArray(locations)) {
        setUserLocations(locations);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch locations";
      setError(errorMessage);
      console.error("Error fetching locations:", error);
    }
  };

  const onchangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setUploading(true);

      await axios.post(`${REACT_APP_API_URL}/api/users/register`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("User added successfully!");
    } catch (e) {
      setError(e.response?.data?.message || "An error occurred");
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="m-5">
      <h1 className="text-3xl font-semibold text-neutral-900">Add New User</h1>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <form onChange={onchangeHandler} onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={data.role || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Location
            </label>
            <input
              list="storage-locations"
              id="location"
              name="location"
              value={data.location || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              placeholder="Select or type a Location"
              required
            />
            <datalist id="storage-locations">
              {userLocations.length === 0 ? (
                <option value="No locations available" disabled />
              ) : (
                userLocations.map((location) => (
                  <option key={location.id} value={location.name} />
                ))
              )}
            </datalist>
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={data.contactNumber || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={data.status || ""}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
          disabled={uploading}
        >
          {uploading ? "Adding..." : "Add User"}
        </button>
      </form>
      <br />
      {successMessage && (
        <ShowSuccessMessage>
          <div className="text-gray-900 text-lg">{successMessage}</div>
        </ShowSuccessMessage>
      )}
    </div>
  );
}

export default NewUserScreen;
