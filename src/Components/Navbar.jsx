import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { ProductContext } from "../Context/productContext";
import { UserContext } from "../Context/userContext";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setShowSearch } = useContext(ProductContext);
  const { token, setToken, role, logout } = useContext(UserContext);
  const {getCartCount} = useContext(ShopContext)

  const toggleDropdown = () => {
    if (token) {
      setIsOpen(!isOpen);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src="./logo.png" className="w-36" alt="Logo" />

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
        {role === "admin" && (
          <Link to="/admin/add" className="relative">
            <RiAdminLine className="h-10 w-6" />
          </Link>
        )}
        <div>
          <NavLink to="/collection">
            <img
              src="./search_icon.png"
              alt=""
              onClick={() => setShowSearch(true)}
              className="w-5 cursor-pointer"
            />
          </NavLink>{" "}
        </div>

        <div className="relative">
          <img
            className="w-5 cursor-pointer"
            src="./profile_icon.png"
            alt="Profile"
            onClick={toggleDropdown}
          />
          {token && isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
              <ul className="text-black" onClick={() => setIsOpen(false)}>
                <li
                  onClick={() => navigate("/order")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Order
                </li>
                 <li
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src="./cart_icon.png" className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white rounded-full">
            {getCartCount()}
          </p>
        </Link>

        <NavLink to="/login">
          <img
            onClick={() => setVisible(true)}
            src="./menu_icon.png"
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </NavLink>
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        } overflow-hidden sm:hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src="./dropdown_icon.png"
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p>BACK</p>
          </div>

          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="p-4 border text-gray-700"
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            onClick={() => setVisible(false)}
            className="p-4 border text-gray-700"
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className="p-4 border text-gray-700"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className="p-4 border text-gray-700"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
