import React, { useState, useEffect } from "react";
import { REACT_APP_API_URL } from "../../router";
import Popup from "../../components/PopUpSuccess";

const NewAssetScreen = () => {
  const [assetType, setAssetType] = useState("None");
  const [device, setDevice] = useState("");
  const [storage, setStorage] = useState("");
  const [user, setUser] = useState("");
  const [devices, setDevices] = useState([]);
  const [storages, setStorages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [storagesRes, usersRes, devicesRes] = await Promise.all([
          fetch(`${REACT_APP_API_URL}/api/storages/all`).then((res) => res.json()),
          fetch(`${REACT_APP_API_URL}/api/users/all`).then((res) => res.json()),
          fetch(`${REACT_APP_API_URL}/api/devices/all`).then((res) => res.json()),
        ]);

        if (storagesRes.success) setStorages(storagesRes.storages);
        if (usersRes.success) setUsers(usersRes.users);
        if (devicesRes.success) setDevices(devicesRes.devices);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssetTypeChange = (e) => {
    setAssetType(e.target.value);
    setUser("");
    setDevice("");
    setStorage("");
  };

  const handleCreateAsset = async () => {
    setLoading(true);
    try {
      let postData = {
        device_id: device,
        user_id: user,
      };

      const isStorage = assetType === "Storages";

      if (isStorage) {
        postData = {
          device_id: device,
          storage_id: storage,
        };
      }

      const url = isStorage
        ? `${REACT_APP_API_URL}/api/assignments/storages/new`
        : `${REACT_APP_API_URL}/api/assignments/users/new`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(`Successfully added ${assetType.toLowerCase()}.`);
        setDevice("");
        setStorage("");
        setUser("");
        setError(null);
      } else {
        setError(result.message || "Failed to create asset");
      }
    } catch (error) {
      setError("Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
          New Asset Creation
        </h2>

        <div className="mb-4">
          <label htmlFor="assetType" className="block text-lg font-medium mb-2">
            Select Asset Type
          </label>
          <select
            id="assetType"
            value={assetType}
            onChange={handleAssetTypeChange}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
            <option value="None">None</option>
            <option value="Devices">Devices</option>
            <option value="Storages">Storages</option>
          </select>
        </div>

        {assetType === "Devices" && (
          <>
            <div className="mb-4">
              <label htmlFor="device" className="block text-lg font-medium mb-2">
                Select Device
              </label>
              <select
                id="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                <option value="">Select Device</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.serial_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="user" className="block text-lg font-medium mb-2">
                Select User
              </label>
              <select
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {assetType === "Storages" && (
          <>
            <div className="mb-4">
              <label htmlFor="storage" className="block text-lg font-medium mb-2">
                Select Storage
              </label>
              <select
                id="storage"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                <option value="">Select Storage</option>
                {storages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="device" className="block text-lg font-medium mb-2">
                Select Device
              </label>
              <select
                id="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                <option value="">Select Device</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.serial_number}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCreateAsset}
            className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
            disabled={loading || error}
          >
            {loading ? "Loading..." : "Create Asset"}
          </button>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {successMessage && (
          <Popup message={successMessage} onClose={() => setSuccessMessage("")} />
        )}
      </div>
    </div>
  );
};

export default NewAssetScreen;
