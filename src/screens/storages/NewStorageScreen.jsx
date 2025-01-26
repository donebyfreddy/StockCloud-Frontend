import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import ShowSuccessMesasge from "../../components/ShowSuccessMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import axios from "axios";
import { REACT_APP_API_URL } from "../../router";


function NewStorageScreen() {
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({});
  const [isError, setError] = useState("");
  const [storageLocations, setStorageLocations] = useState([]);

  useEffect(() => {
    console.log(storageLocations);
  }, [storageLocations]);

  useEffect(() => {
    fetchNecessaryData();
  }, []);



  const fetchNecessaryData = async () => {
    try {
      const resLocations = await axios.get(`${REACT_APP_API_URL}/api/location/all`);
      const locations = resLocations.data;
  
      if (locations && Array.isArray(locations)) {
        setStorageLocations(locations);
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

      const {} = await axios.post(
        `${REACT_APP_API_URL}/api/storages/new`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setUploading(false);
    }
  }


    
  
  return (
    <div className="p-5 w-full h-full">
      <h1 className="text-2xl font-semibold">Add New Storage </h1>

      {isError && (
        <ShowErrorMessage
          children={<span className="underline cursor-pointer">reload</span>}
        />
      )}
      {success && (
        <>
          <br />
          <div className="mx-auto text-center border-teal-700 bg-teal-300 p-3 w-1/4 border-2 rounded-md">
            <p>
              Updated Successfullly{" "}
              <Link className="underline" to={"/admin/dashboard"} replace={true}>
                goto Home
              </Link>
            </p>
          </div>
          <br />
        </>
      )}

      <div className="max-w-lg mx-auto">
        <form
          onChange={(e) => onchangeHandler(e)}
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name || ""}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-lg font-semibold text-neutral-800 mb-1">
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
              {storageLocations.length === 0 ? (
                <option value="No locations available" disabled />
              ) : (
                storageLocations.map((location) => (
                  <option key={location.id} value={location.name} />
                ))
              )}
            </datalist>
          </div>

          <div className="mb-6">
            <label htmlFor="desc" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="desc"
              value={data.description || ""}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={uploading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {uploading ? "Uploading..." : "Add Storage"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default NewStorageScreen;
