// Settings.jsx
import React, { useState } from "react";
import { useDeveloperMode } from "../../components/DeveloperModeContext"; // Import the context

const Settings = () => {
  const { developerMode, setDeveloperMode } = useDeveloperMode(); // Access global state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSave = () => {
    // Optionally handle saving the settings to local storage, API, etc.
    alert("Settings saved!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>
      <div className="mb-4">
        <label className="text-lg text-gray-700">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="mr-3"
          />
          Enable Notifications
        </label>
      </div>
      <div className="mb-6">
        <label className="text-lg text-gray-700">
          <input
            type="checkbox"
            checked={developerMode}
            onChange={(e) => setDeveloperMode(e.target.checked)}
            className="mr-3"
          />
          Enable Developer Mode
        </label>
      </div>
      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
