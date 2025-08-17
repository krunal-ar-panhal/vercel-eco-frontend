import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import axios from "axios";
import { ProductContext } from "../Context/productContext";

const Collection = () => {
const { products, search, showSearch } = useContext(ProductContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const [availableColors, setAvailableColors] = useState([]);  
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const colors = new Set();
    products.forEach((product) => {
      if (product.color) {
        colors.add(product.color);
      }
    });
    setAvailableColors([...colors]);
  }, [products]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleColor = (e) => {
    if (selectedColors.includes(e.target.value)) {
      setSelectedColors((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSelectedColors((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products]; 
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected colors
    if (selectedColors.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedColors.includes(item.color)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get('/api/category/get')
      console.log("category response",response);
      
    } catch (error) {
      console.log("category error",error);
      
    }
  }

  useEffect(()=>{
    getCategory()
  },[])

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, selectedColors]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Calculate the products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  // Handle page change with smooth scroll
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src="./dropdown_icon.png"
            alt="Toggle Filters"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Men" onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Women" onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Topwear" onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
              Winterwear
            </p>
          </div>
        </div>

        {/* Color Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">COLOR</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {availableColors.map((color, index) => (
              <p key={index} className="flex gap-2">
                <input className="w-3" type="checkbox" value={color} onChange={toggleColor} />
                {color}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {currentProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            className={`px-4 py-2 border rounded-l-lg ${currentPage === 1 ? "bg-gray-300" : "bg-gray-500 text-white"}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 border rounded-r-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-500 text-white"}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
