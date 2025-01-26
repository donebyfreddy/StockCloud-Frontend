import React, { useEffect, useState } from "react";
import axios from "axios";
import { REACT_APP_API_URL } from "../../router"; // Ensure this is correctly set
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";



function ProfileScreen() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/users/me`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        setError("Failed to fetch user info");
      }
    } catch (e) {
      setError(e.message || "An error occurred while fetching user info.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/users/upload-image`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        // Update user's profile image in the state
        setUser((prevUser) => ({
          ...prevUser,
          image: response.data.user.image, // Update using the image field
        }));
      } else {
        setError("Failed to upload the image.");
      }
    } catch (e) {
      setError(e.message || "An error occurred during image upload.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ShowErrorMessage
        message={error}
        children={
          <span className="underline cursor-pointer" onClick={fetchUserInfo}>
            reload
          </span>
        }
      />
    );
  }

  if (!user) {
    return (
      <div className="m-5 text-center">
        <p className="text-lg text-red-600">User not found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-neutral-900">Profile</h1>
        <p className="text-lg text-neutral-600">Manage your profile information</p>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-neutral-300">
          {user.image ? (
            <img
              src={`${REACT_APP_API_URL}/uploads/${user.image}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-xl text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <label
          htmlFor="imageUpload"
          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
        >
          Change Image
        </label>
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="mt-5 text-center">
        <h2 className="text-2xl font-medium text-neutral-900">{user.name}</h2>
        <p className="text-lg text-neutral-600">{user.email}</p>
      </div>
    </div>
  );
}

export default ProfileScreen;
