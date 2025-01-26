import axios from "axios";
import React, { useState } from "react";
//import { SERVER_URL } from "../../../router";


function ManageUserTableRow({ user, role }) {
  const [userRole, setUserRole] = useState(user.role);
  const [isLoading, setLoading] = useState(false);

  async function changeRoleAPicall() {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.SERVER_URL}/api/users/change-role`, // Corrected the typo in the endpoint
        {
          targetUserId: user._id,
          role: userRole === "user" ? "admin" : "user", // Toggle the role
        },
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Toggle role after successful API call
      setUserRole((prevRole) => (prevRole === "admin" ? "user" : "admin"));
    } catch (e) {
      console.error(e);
      // If there is an error, revert the role change
      setUserRole((prevRole) => (prevRole === "admin" ? "user" : "admin"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <tr className="border-b border">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3">
        <span
          className={`${
            userRole === "admin"
              ? "bg-red-200 rounded-md border-red-600 border"
              : "bg-teal-100 rounded-md border-teal-900 border"
          } px-3 py-1 w-min ${isLoading && "animate-pulse"}`}
        >
          {userRole}
        </span>
      </td>

      {role === "admin" && (
        <td className="px-4 py-3">
          <button
            onClick={changeRoleAPicall}
            className="underline text-blue-500 flex items-center gap-3"
            disabled={isLoading} // Disable the button while loading
          >
            Change Role to{" "}
            <span>{userRole === "admin" ? "user" : "admin"}</span>
            {isLoading && (
              <div className="w-5 h-5 border-2 border-b-black border-t-black border-r-black rounded-full animate-spin" />
            )}
          </button>
        </td>
      )}
    </tr>
  );
}

export default ManageUserTableRow;
