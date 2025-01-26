// components/Popup.js
import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
        <p className="text-lg font-medium">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
