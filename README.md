import React, { useState, useContext } from 'react';
import CartTotal from '../Components/CartTotal';
import Title from '../Components/Title';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../Context/orderContext';
import { ShopContext } from '../Context/ShopContext';

const PlaceOrder = () => {
  const { placeOrder } = useContext(OrderContext);
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 

  const onSubmit = (e) => {
    e.preventDefault();


         let orderItems = [];

  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      if (cartItems[items][item] > 0) {
        const itemInfo = products.find(product => product._id === items);
        
        if (itemInfo) {
          const orderItem = { ...itemInfo };
          orderItem.size = item;
          orderItem.quantity = cartItems[items][item];
          orderItems.push(orderItem);
        }
      }
    }
  }
  console.log("order items",orderItems);

  let amount = Number(getCartAmount()) + Number(delivery_fee);
  console.log("Calculated Amount:", amount);


  let orderData = {
    address: formData,
    items: orderItems,
    amount: amount,
  };

    placeOrder(orderData, navigate);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-screen-lg mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 space-y-4">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="w-full p-3 border rounded-md" />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="w-full p-3 border rounded-md" />
        </div>
        <input required name='email' value={formData.email} onChange={onChangeHandler} placeholder="Email" className="w-full p-3 border rounded-md" />
        <input required name='street' value={formData.street} onChange={onChangeHandler} placeholder="Street" className="w-full p-3 border rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name='city' value={formData.city} onChange={onChangeHandler} placeholder="City" className="w-full p-3 border rounded-md" />
          <input required name='state' value={formData.state} onChange={onChangeHandler} placeholder="State" className="w-full p-3 border rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler} placeholder="Zip Code" className="w-full p-3 border rounded-md" />
          <input required name='country' value={formData.country} onChange={onChangeHandler} placeholder="Country" className="w-full p-3 border rounded-md" />
        </div>
        <input required name='phone' value={formData.phone} onChange={onChangeHandler} placeholder="Phone" type="number" className="w-full p-3 border rounded-md" />
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 shadow rounded-md">
        <CartTotal />
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="mt-4 p-3 bg-green-200 rounded-md text-lg">Cash on Delivery</div>
        <button type="submit" className="mt-6 w-full py-3 bg-black text-white text-lg rounded-md hover:bg-gray-800">
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
