import React, { useState } from 'react';
import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  return (
    <div className="max-w-screen-lg mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* LEFT SIDE: Delivery Information */}
      <div className="w-full md:w-1/2 space-y-4">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" placeholder="Street" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="State" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Zip Code" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Country" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="number" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* RIGHT SIDE: Cart & Payment Method */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md">
        <div className="mb-6">
          <CartTotal />
        </div>
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="space-y-4 mt-4">
          {/* Payment Method Options */}
          <div
            onClick={() => setMethod("stripe")}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-md ${method === "stripe" ? "bg-green-200" : "bg-gray-100"}`}
          >
            <img src="./stripe_logo.png" alt="Stripe" className="w-12" />
            <p className="text-lg">Stripe</p>
          </div>
          <div
            onClick={() => setMethod("razorpay")}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-md ${method === "razorpay" ? "bg-green-200" : "bg-gray-100"}`}
          >
            <img src="./razorpay_logo.png" alt="Razorpay" className="w-12" />
            <p className="text-lg">Razorpay</p>
          </div>
          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-md ${method === "cod" ? "bg-green-200" : "bg-gray-100"}`}
          >
            <p className="text-lg">Cash on Delivery</p>
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full py-3 bg-black text-white text-lg rounded-md hover:bg-gray-800 transition duration-200">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
