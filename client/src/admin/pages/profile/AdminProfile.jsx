import React from "react";

const AdminProfilePage = () => {
  return (
    <div>
      <h2>Admin Profile Page</h2>
      <div>
        <h3>Profile Information</h3>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Role: Admin</p>
      </div>
      <div>
        <h3>Actions</h3>
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
};

export default AdminProfilePage;
