import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import toast from 'react-hot-toast';
import axios from 'axios';

const Order = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator

  const getOrderData = async () => {
    try {
      if (!token) {
        setLoading(false); // No token, stop loading
        return;
      }
      
      const response = await axios.post('/api/order/userorder', {}, { headers: { token } });
      
      if (response.data.success) {
        let allOrdersItem = [];

        // Process each order and extract order items
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            // Add additional details to each item
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;

            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse()); // Set orders in reverse order (latest first)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  useEffect(() => {
    getOrderData(); // Fetch orders when the component mounts or token changes
  }, [token]);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading ? (
        <p>Loading orders...</p> // Display loading message while fetching data
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderData.length === 0 ? (
            <p>No orders available</p> // Display if no orders are found
          ) : (
            orderData.map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="flex flex-col items-center">
                  <img src={item.image[0]} alt={item.name} className="w-48 h-48 object-cover mb-4" />
                  <p className="text-xl font-semibold text-gray-800 mb-2">{item.name}</p>
                  <div className="text-gray-600 mb-4">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Date: <span className="font-medium">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: <span className="font-medium">{item.paymentMethod}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-gray-700">{item.status}</p>
                  </div>
                  <button
                    onClick={getOrderData} 
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
  