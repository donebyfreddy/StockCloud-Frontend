import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import { useOutletContext, useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from "../../router";



function DeviceManagementScreen() {
    const [data, Device] = useOutletContext();
    const [isLoading, setLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [devices, setDevices] = useState([]);  // Ensure devices is initialized as an empty array
    const [editDeviceId, setEditDeviceId] = useState(null);
    const [editValues, setEditValues] = useState({
        serial_number: "",
        type: "",
        manufacturer: "",
        model: "",
        location: "",
        description: "",
        details: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const navigateToAddUser = () => {
        navigate("/admin/devices/new");
    };

    useEffect(() => {
        getDataFromApi();
    }, [currentPage, itemsPerPage]); // Re-fetch data when page or itemsPerPage changes

    async function getDataFromApi() {
        try {
            const { data } = await axios.get(`${REACT_APP_API_URL}/api/devices/all`, {
                params: {
                    page: currentPage,
                    itemsPerPage: itemsPerPage,
                },
            });
            setDevices(data.devices || []);  // Make sure to default to an empty array if data.devices is undefined
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    function handleEditClick(device) {
        setEditDeviceId(device._id);
        setEditValues({
            serial_number: device.serial_number,
            type: device.type,
            manufacturer: device.manufacturer,
            model: device.model,
            location: device.locationData?.name || '',
            description: device.description,
            details: device.details,
        });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    async function handleSaveChanges(id) {
        const payload = {
            serial_number: editValues.serial_number,
            type: editValues.type,
            manufacturer: editValues.manufacturer,
            model: editValues.model,
            location: editValues.location,
            description: editValues.description,
            details: editValues.details,
        };

        try {
            const response = await axios.patch(`${REACT_APP_API_URL}/api/devices/${id}`, payload);
            setEditDeviceId(null);
            getDataFromApi(); // Refresh data after save
        } catch (error) {
            console.error("Error during PATCH request:", error);
        }
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">Device Management</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Here you can modify the privileges of a Device (admin/device).
                </p>
            </div>

            {error && (
                <ShowErrorMessage
                    children={<span className="underline cursor-pointer">reload</span>}
                    message={error}
                />
            )}

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={navigateToAddUser}
                    className="bg-teal-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-teal-700 transition"
                >
                    Add Device
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                <table className="w-full table-auto">
                    <thead className="bg-teal-50 text-gray-700 border-b">
                        <tr>
                            {["serial_number", "type", "manufacturer", "model", "location", "description", "details", "updatedAt", "actions"].map((col) => (
                                <th key={col} className="px-6 py-3 text-left font-semibold">
                                    {col.charAt(0).toUpperCase() + col.slice(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center">
                                    <LoadingIndicator />
                                </td>
                            </tr>
                        ) : (
                            devices.length > 0 ? (
                                devices.map((device) => (
                                    <tr key={device._id} className="hover:bg-teal-50">
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="serial_number"
                                                    value={editValues.serial_number}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.serial_number
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="type"
                                                    value={editValues.type}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.type
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="manufacturer"
                                                    value={editValues.manufacturer}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.manufacturer
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="model"
                                                    value={editValues.model}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.model
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={editValues.location}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.locationData?.name || 'Unknown Location'
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editValues.description}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.description
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <input
                                                    type="text"
                                                    name="details"
                                                    value={editValues.details}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                />
                                            ) : (
                                                device.details
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <span className="text-gray-600">{editValues.updatedAt}</span>
                                            ) : (
                                                device.updatedAt
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {editDeviceId === device._id ? (
                                                <button
                                                    className="text-green-600 hover:text-green-700 font-semibold"
                                                    onClick={() => handleSaveChanges(device._id)}
                                                >
                                                    Save Changes
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                                    onClick={() => handleEditClick(device)}
                                                >
                                                    Edit Device
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-4 text-center text-gray-600">
                                        No devices found.
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                <div className="flex justify-between items-center py-4 mx-6">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            className="border rounded-md w-16 text-center"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        />
                        <h5>Per Page</h5>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="flex gap-2 items-center border rounded-md py-2 text-lg font-semibold px-4 hover:bg-teal-50 hover:text-teal-700"
                        >
                            <IoIosArrowBack />
                            <span>Prev</span>
                        </button>

                        <span className="text-lg">{`${currentPage} of ${totalPages}`}</span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="flex gap-2 items-center border rounded-md py-2 text-lg font-semibold px-4 hover:bg-teal-50 hover:text-teal-700"
                        >
                            <span>Next</span>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceManagementScreen;
