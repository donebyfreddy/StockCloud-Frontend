import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from '../../router'



function SignupScreen() {
  const navigator = useNavigate();

  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handInputChange(e) {
    console.log(e.target.id, e.target.value);
    setData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSignIN(e) {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        `${REACT_APP_API_URL}/api/users/register`,
        formData
      );

      console.log(data);

      if (status === 201) {
        navigator("/auth", { replace: true });
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      alert("User Already exists with the same email");
    }
  }

  return (
    <div className="flex items-center min-h-screen p-4 bg-gradient-to-r from-blue-100 to-blue-500 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-xl max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="px-10 py-6 text-white bg-blue-600 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="flex flex-col items-center justify-center my-6">
            <img src="/logo-red.png" alt="logo" className="w-32 mb-4" />
            <a href="#" className="text-4xl font-bold tracking-wider text-center">Inventory Management</a>
          </div>
          <p className="font-medium text-center text-white-500">
            Your one-stop solution for efficient inventory management.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account?</span>
            <Link to={"/auth"} className="underline text-yellow-300">
              Log in
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-white-300">
            By signing up, you agree to our{" "}
            <a href="#" className="underline text-yellow-300">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-yellow-300">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Signup
          </h3>
          <form
            action="#"
            className="flex flex-col space-y-5"
            onSubmit={(e) => handleSignIN(e)}
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-sm font-semibold text-gray-500">
                User Name
              </label>
              <input
                type="text"
                id="name"
                autoFocus
                onChange={handInputChange}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                onChange={handInputChange}
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">
                  Password
                </label>
              </div>
              <input
                onChange={handInputChange}
                type="password"
                id="password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-300"
              />
              <label htmlFor="remember" className="text-sm font-semibold text-gray-500">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-blue-300 focus:ring-4"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
