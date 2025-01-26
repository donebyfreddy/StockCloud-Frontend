import React, { useState } from "react";

function UserEditModal({ user, onSave, onClose }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedUser);
  };

  return (
    <div className="modal">
      <h2>Edit User</h2>
      <input
        type="text"
        name="name"
        value={updatedUser.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={updatedUser.email}
        onChange={handleChange}
      />
      <select
        name="role"
        value={updatedUser.role}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default UserEditModal;
