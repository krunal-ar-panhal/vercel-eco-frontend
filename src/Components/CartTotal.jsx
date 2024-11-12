import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../Context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0); 

  useEffect(() => {
    const calculateAmount = async () => {
      const amount = await getCartAmount();
      setCartAmount(amount); 
    };
    calculateAmount();
  }, [getCartAmount]); 

  return (
    <div className="w-full">
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <hr />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr />

        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {cartAmount === 0 ? cartAmount : cartAmount + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
