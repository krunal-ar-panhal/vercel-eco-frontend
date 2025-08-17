import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile, fetchUser, deleteUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const defaultImage = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || defaultImage);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSave = async () => {
    const formData = {
      name: name,
      password: password,
      image: image,
    };

    await updateProfile(formData);
    await fetchUser();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      await deleteUser();
      navigate("/login");  // Redirect after deletion
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center hover:scale-105 transition-transform duration-300">
        
        <div className="relative inline-block mb-4">
          <img
            src={image || defaultImage}
            alt="User"
            className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 shadow-lg object-cover"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-32 h-32 opacity-0 cursor-pointer"
            />
          )}
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Name"
            />

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded-lg mb-2 bg-gray-100 cursor-not-allowed"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="New Password (optional)"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 shadow-md"
              >
                Save
              </button>

              {user?.role !== "admin" && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md"
                >
                  Delete
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.name}
            </h2>
            <p className="text-gray-500 mb-1">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-500 mb-1">
              <span className="font-semibold">Role:</span> {user?.role || "user"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 shadow-md mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
