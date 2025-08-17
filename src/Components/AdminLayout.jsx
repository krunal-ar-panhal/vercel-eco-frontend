import { useContext } from "react";
import Footer from "./Admin/Footer";
import Navbar from "./Admin/Navbar";
import Sidebar from "./Admin/Sidebar";
import { UserContext } from "../Context/userContext";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

      const {token, setToken} = useContext(UserContext)
  

  return (
    <>
      <Navbar setToken={setToken} />
      <hr />
      <div className="flex w-full bg-gray-50 min-h-screen">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[60%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Outlet /> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout