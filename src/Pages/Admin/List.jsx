import React, { useContext } from "react";
import { ProductContext } from "../../Context/productContext";

const ProductList = () => {
  const { products, removeProduct } = useContext(ProductContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">All Product List</h1>

      <div className="grid grid-cols-5 gap-6 mb-4 text-lg font-medium text-gray-700">
        <div className="text-center"><b>Image</b></div>
        <div className="text-center"><b>Name</b></div>
        <div className="text-center"><b>Category</b></div>
        <div className="text-center"><b>Price</b></div>
        <div className="text-center"><b>Action</b></div>
      </div>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-6 items-center border-b py-4">
            <div className="flex justify-center">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="text-center text-gray-800">{item.name}</div>
            <div className="text-center text-gray-600">{item.category}</div>
            <div className="text-center text-gray-900">{item.price}</div>
            <div className="flex justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
