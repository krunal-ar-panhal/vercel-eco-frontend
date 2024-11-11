import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch} = useContext(ShopContext)

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src="./logo.png" className="w-36" alt="Logo" />

      {/* Navigation links: hidden on small screens */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <div>
          <img src="./search_icon.png" alt="" onClick={()=>setShowSearch(true)}  className="w-5 cursor-pointer"/>
        </div>
        {/* Profile icon with dropdown */}
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src="./profile_icon.png"
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart icon */}
        <Link to="/cart" className="relative">
          <img src="./cart_icon.png" className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white rounded-full">
            3
          </p>
        </Link>

        {/* Menu icon for mobile: displays sidebar when clicked */}
        <img
          onClick={() => setVisible(true)}
          src="./menu_icon.png"
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* SIDEBAR FOR SMALL DEVICE */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 ${visible ? "w-full" : "w-0"} overflow-hidden sm:hidden`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Close button for sidebar */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src="./dropdown_icon.png" alt="dropdown" className="h-4 rotate-180" />
            <p>BACK</p>
          </div>
          
          {/* Sidebar navigation links */}
          <NavLink to="/" onClick={() => setVisible(false)} className="p-4 border text-gray-700">
            Home
          </NavLink>
          <NavLink to="/collection" onClick={() => setVisible(false)} className="p-4 border text-gray-700">
            Collection
          </NavLink>
          <NavLink to="/about" onClick={() => setVisible(false)} className="p-4 border text-gray-700">
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setVisible(false)} className="p-4 border text-gray-700">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
