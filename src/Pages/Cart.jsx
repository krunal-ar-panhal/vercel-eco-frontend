import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    console.log("cartData", tempData);

    setCartData(tempData);
    }
    
  }, [cartItems,products]);

  return (
    <div className="pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-6 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) {
            return null;
          }

          return (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Image and Details */}
              <div className="flex items-center gap-6">
                <img className="w-16 sm:w-20 object-cover" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-sm sm:text-lg font-medium text-gray-800">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-sm sm:text-lg font-semibold">{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded-md text-sm">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center justify-center gap-4">
                <input
                  onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size, Number(e.target.value))}
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border rounded-lg px-2 py-1 w-12 sm:w-16 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Delete Icon */}
              <div className="flex items-center justify-end">
                <img 
                  onClick={()=>updateQuantity(item._id,item.size,0)}
                  src="./bin_icon.png"
                  alt="delete"
                  className="w-5 sm:w-6 cursor-pointer transition-transform transform hover:scale-110"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <Link to='/place'>
            <button className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
