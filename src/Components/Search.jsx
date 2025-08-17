import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../Context/productContext";

const Search = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ProductContext);
  console.log("serach", search);
  
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out transform ${
        showSearch && visible ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden border-t border-b bg-gray-50 text-center`}
    >
      <div className="inline-flex items-center justify-center border border-gray-300 px-5 rounded-full py-2 my-5 mx-3 w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none px-3 bg-inherit text-sm"
          placeholder="Search..."
        />
        <img className="w-4" src="./search_icon.png" alt="Search Icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src="./cross_icon.png"
        alt="Close Icon"
      />
    </div>
  );
};

export default Search;
