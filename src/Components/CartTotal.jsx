import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../Context/ShopContext';
import { ProductContext } from '../Context/productContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const { products } = useContext(ProductContext);  // 👉 Added
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    const calculateAmount = () => {
      const amount = getCartAmount(products);   // 👉 Pass products here
      setCartAmount(amount);
    };
    calculateAmount();
  }, [getCartAmount, products]);   // 👉 Add products as dependency

  return (
    <div className="w-full">
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {cartAmount}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr />
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
