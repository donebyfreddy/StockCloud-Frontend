import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_API_URL } from "../../router";



function NewDeviceScreen() {
  const [isError, setIsError] = useState("");
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceLocations, setDeviceLocations] = useState([]);
  const [deviceManufacturers, setDeviceManufacturers] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [storageNames, setStorageNames] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNecessaryData();
  }, []); // Fetch data only on mount

  const fetchNecessaryData = async () => {
    try {
      const resLocations = await axios.get(`${REACT_APP_API_URL}/api/location/all`);
      const resTypes = await axios.get(`${REACT_APP_API_URL}/api/devices/types`);
      const resManufacturers = await axios.get(`${REACT_APP_API_URL}/api/devices/manufacturers`);
      const resStorages = await axios.get(`${REACT_APP_API_URL}/api/storages/all`);
      const resUsers = await axios.get(`${REACT_APP_API_URL}/api/users/all`); // Fetch all users

      const locations = resLocations.data;
      const types = resTypes.data;
      const manufacturers = resManufacturers.data;
      const storages = Array.isArray(resStorages.data) ? resStorages.data.map(storage => storage.name) : [];
      const users = resUsers.data;

      const userNames = Array.isArray(users) ? users.map(user => user.name) : [];
      const storageNames = Array.isArray(storages) ? storages : []; 

      if (Array.isArray(locations)) { setDeviceLocations(locations); }
      if (Array.isArray(types)) { setDeviceTypes(types); }
      if (Array.isArray(manufacturers)) { setDeviceManufacturers(manufacturers); }
      if (Array.isArray(storages)) { setStorageNames(storageNames); }
      if (Array.isArray(users)) { setUserNames(userNames); }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch data";
      setError(errorMessage);
      console.error("Error fetching necessary data:", error);
    }
  };

  function onchangeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setError("");
      setUploading(true);

      await axios.post(
        `${REACT_APP_API_URL}/api/devices/new`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Device added successfully!");
    } catch (e) {
      setError(e.response?.data?.message || "Error adding device");
      console.log(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="m-5">
      <h1 className="text-3xl font-semibold text-neutral-900">Add New Device</h1>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="serialNo" className="block text-lg font-semibold text-neutral-800 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              id="serialNo"
              name="serialNo"
              value={data.serialNo || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-neutral-800 mb-1">
              Device Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={data.description || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div className="flex items-left space-x-3">
            <div className="w-full">
              <label htmlFor="type" className="block text-lg font-semibold text-neutral-800 mb-1">
                Type (Device)
              </label>
              <input
                list="device-types"
                id="type"
                name="type"
                value={data.type || ""}
                onChange={onchangeHandler}
                className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
                placeholder="Select or type a type"
                required
              />
              <datalist id="device-types">
                {deviceTypes.map((type) => (
                  <option key={type.id} value={type.name} />
                ))}
              </datalist>
            </div>

            {data.type?.toLowerCase() === "computer" && (
              <div>
                <label htmlFor="hostname" className="block text-lg font-semibold text-neutral-800 mb-1">
                  Hostname
                </label>
                <input
                  type="text"
                  id="hostname"
                  name="hostname"
                  value={data.hostname || ""}
                  onChange={onchangeHandler}
                  className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
                  placeholder="Enter Hostname"
                  required
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="manufacturer" className="block text-lg font-semibold text-neutral-800 mb-1">
              Manufacturer
            </label>
            <input
              list="device-manufacturers"
              id="manufacturer"
              name="manufacturer"
              value={data.manufacturer || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              placeholder="Select or type a Manufacturer"
              required
            />
            <datalist id="device-manufacturers">
              {deviceManufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.name} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="model" className="block text-lg font-semibold text-neutral-800 mb-1">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={data.model || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="location" className="block text-lg font-semibold text-neutral-800 mb-1">
              Location
            </label>
            <input
              list="device-locations"
              id="location"
              name="location"
              value={data.location || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              placeholder="Select or type a Location"
              required
            />
            <datalist id="device-locations">
              {deviceLocations.length === 0 ? (
                <option value="No locations available" disabled />
              ) : (
                deviceLocations.map((location, index) => (
                  <option key={location.id || `${location.name}-${index}`} value={location.name} />
                ))
              )}
            </datalist>
          </div>

          <div>
            <label htmlFor="dateOfPurchase" className="block text-lg font-semibold text-neutral-800 mb-1">
              Purchase Date
            </label>
            <input
              type="datetime-local"
              id="dateOfPurchase"
              name="dateOfPurchase"
              value={data.dateOfPurchase || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
          <div>
            <label htmlFor="dateWarranty" className="block text-lg font-semibold text-neutral-800 mb-1">
              Warranty Date
            </label>
            <input
              type="datetime-local"
              id="dateWarranty"
              name="dateWarranty"
              value={data.dateWarranty || ""}
              onChange={onchangeHandler}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Device"}
        </button>
      </form>
    </div>
  );
}

export default NewDeviceScreen;
