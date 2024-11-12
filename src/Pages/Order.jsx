import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';

const Order = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(1, 4).map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div className="flex flex-col items-center">
              <img src={item.image[0]} alt={item.name} className="w-48 h-48 object-cover mb-4" />
              <p className="text-xl font-semibold text-gray-800 mb-2">{item.name}</p>
              <div className="text-gray-600 mb-4">
                <p className="text-lg">{currency}{item.price}</p>
                <p>Quantity: 1</p>
                <p>Size: M</p>
              </div>
              <p className="text-sm text-gray-500">
                Date: <span className="font-medium">25, July, 2024</span>
              </p>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm text-gray-700">Ready To Ship</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
