  import React, { useContext, useState } from 'react';
  import Title from '../Components/Title';
  import CartTotal from '../Components/CartTotal';
  import { ShopContext } from '../Context/ShopContext';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import toast from 'react-hot-toast';

  const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const {token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      firstName:"",
      lastName: "",
      email:"",
      street: "",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:"",
    })

    const onChangeHandler = (e) => {
      const name = e.target.name
      const value = e.target.value
      setFormData(data =>({
        ...data,[name]:value
      }))
    }

    const onSubmit = async (e) => {
      try {
        e.preventDefault()
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

      switch(method){
        case 'cod':
          const response = await axios.post('/api/order/place',orderData,{headers:{token}})
          console.log("cod response",response);
          if (response.data.success) {
            setCartItems({})
            navigate('/order')
            toast.success(response.data.success)
          } else {
            toast.error(response.data.message)
          }
          
      }

      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }

    return (
      <form onSubmit={onSubmit} className="max-w-screen-lg mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE: Delivery Information */}
        <div className="w-full md:w-1/2 space-y-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input onChange={onChangeHandler} required name='firstName' value={formData.firstName} type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input onChange={onChangeHandler} required name='lastName' value={formData.lastName} type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input onChange={onChangeHandler} required name='email' value={formData.email} type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input onChange={onChangeHandler} required name='street' value={formData.street} type="text" placeholder="Street" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input onChange={onChangeHandler} required name='city' value={formData.city} type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input onChange={onChangeHandler} required name='state' value={formData.state} type="text" placeholder="State" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input onChange={onChangeHandler} required name='zipcode' value={formData.zipcode} type="text" placeholder="Zip Code" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input onChange={onChangeHandler} required name='country' value={formData.country} type="text" placeholder="Country" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input onChange={onChangeHandler} required name='phone' value={formData.phone} type="number" placeholder="Phone" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
      </form>
    );
  };

  export default PlaceOrder;
