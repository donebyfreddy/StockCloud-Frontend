import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from '../../router'



function LoginScreen() {
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate(); // Use useNavigate instead of useHistory

  function handInputChange(e) {
    setData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const lowercasedFormData = {
      ...formData,
      email: formData.email.toLowerCase(),
    };

    try {
      const { data, status } = await axios.post(
        `${REACT_APP_API_URL}/api/users/login`,
        lowercasedFormData,
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", data, "Status:", status);



      if (status === 201) {
        history("/admin/dashboard"); // Use history function to redirect
      } else {
        alert("Wrong credentials. Check Email and password ");
      }
    } catch (error) {
      console.error("Something went wrong during login:", error.response ? error.response.data : error.message);
      alert("Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 p-4">
      <div className="flex flex-col bg-white rounded-lg shadow-2xl max-w-sm w-full p-8">
        <div className="text-center mb-6">
          <img src="/logo-red.png" alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-3xl font-semibold text-gray-800">StockCloud</h2>
          <p className="text-sm text-gray-500">Your Inventory Management System</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              onChange={handInputChange}
              type="email"
              id="email"
              autoFocus
              required
              className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={handInputChange}
              id="password"
              required
              className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-5 h-5 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-500 hover:underline">
              Get Started!
            </Link>
          </p>
          <p className="mt-4 text-xs text-gray-500">
            By logging in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              privacy policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
