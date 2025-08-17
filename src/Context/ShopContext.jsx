import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProductContext } from "./productContext";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const {products} = useContext(ProductContext)
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  

 

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select the size");
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post('https://vercel-eco-frontend.vercel.app/api/cart/add', { itemId, size }, { headers: { token } });
        toast.success("Item added to cart!");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      toast.error("You need to be logged in to add items to the cart.");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        totalCount += cartItems[items][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post('https://vercel-eco-frontend.vercel.app/api/cart/update', { itemId, size, quantity }, { headers: { token } });
        toast.success(response.data.message);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      toast.error("You need to be logged in to update the cart.");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const cartItem = cartItems[itemId];
      const itemInfo = products.find(product => product._id === itemId);

      if (itemInfo) {
        for (const size in cartItem) {
          const quantity = cartItem[size];
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getUserCart = async (storedToken) => {
    try {
      const response = await axios.get('https://vercel-eco-frontend.vercel.app/api/cart/get', { headers: { token: storedToken } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
         localStorage.setItem('cart', JSON.stringify(response.data.cartData));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if ( storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
  }, [cartItems]);

  const value = {
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setToken,   // expose in case needed elsewhere
    token,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
