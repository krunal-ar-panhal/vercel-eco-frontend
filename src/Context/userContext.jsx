import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("https://vercel-eco-frontend.vercel.app/api/user/signin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
        setRole(res.data.user.role);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("https://vercel-eco-frontend.vercel.app/api/user/signup", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
    setUser(null);
    toast.success("Logged out");
  };

  const updateProfile = async (formData) => {
    try {
      const res = await axios.put(
        "https://vercel-eco-frontend.vercel.app/api/user/update",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.updatedUser);
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const fetchUser = async () => {
    if (token) {
      try {
        const res = await axios.get("https://vercel-eco-frontend.vercel.app/api/user/get", {
          headers: { token: token },
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    }
  };

   const deleteUser = async () => {
    try {
      const res = await axios.delete('https://vercel-eco-frontend.vercel.app/api/user/delete', {
        headers: { token }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Delete User Error:", error);
      toast.error("Failed to delete user.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        role,
        user,
        setUser,
        setRole,
        login,
        signup,
        logout,
        updateProfile,
        fetchUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
