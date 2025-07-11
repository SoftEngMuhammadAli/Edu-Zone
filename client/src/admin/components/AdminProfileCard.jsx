import React from "react";
import { useSelector } from "react-redux";

const AdminProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.user_type !== "admin") {
    return null;
  }

  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-6">
        <div className="text-right">
          <p className="text-sm text-gray-500">Hi, {user?.name || "Admin"}</p>
          <p className="font-semibold capitalize">{user?.role || "Admin"}</p>
        </div>
        <img
          src={user?.profile_picture_url || "https://via.placeholder.com/40"}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default AdminProfileCard;
