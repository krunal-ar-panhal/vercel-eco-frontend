import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ShopContext } from './ShopContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { token, setCartItems } = useContext(ShopContext);
  const [userOrders, setUserOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  console.log("admin orders", adminOrders);
  
  const [loading, setLoading] = useState(false);

  // Fetch orders for logged-in user
  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://vercel-eco-frontend.vercel.app/api/order/userorder', {}, { headers: { token } });
      if (res.data.success) {
        let allItems = [];
        res.data.orders.forEach(order => {
          order.items.forEach(item => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allItems.push(item);
          });
        });
        setUserOrders(allItems.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all orders for admin
  const fetchAdminOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://vercel-eco-frontend.vercel.app/api/order/list', { headers: { token } });
      console.log("admin res",res);
      
      if (res.data.success) {
        setAdminOrders(res.data.orders);
      } else {
        toast.error('Failed to load admin orders');
      }
    } catch (error) {
      console.log(error);
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  // Place new order
  const placeOrder = async (orderData, navigate) => {
    try {
      const res = await axios.post('https://vercel-eco-frontend.vercel.app/api/order/place', orderData, { headers: { token } });
      if (res.data.success) {
        setCartItems({});
        navigate('/order');
        toast.success('Order placed successfully');
      } else {
        toast.error(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.post('https://vercel-eco-frontend.vercel.app/api/order/status', { orderId, status: newStatus }, { headers: { token } });
      if (res.data.success) {
        toast.success('Order status updated');
        fetchAdminOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update order');
    }
  };

  return (
    <OrderContext.Provider
      value={{
        userOrders,
        adminOrders,
        loading,
        fetchUserOrders,
        fetchAdminOrders,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
