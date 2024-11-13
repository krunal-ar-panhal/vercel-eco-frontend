import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [serach , setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [products, setProdcts] = useState([])
  console.log(products);
  

  const addToCart = async (itemId,size) => {
    let cartData = structuredClone(cartItems)
      if (!size) {
        toast.error("Select the size")
        return;
      }
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      }
      else{
        cartData[itemId][size] = 1
      }
    }
    else{
      cartData[itemId] = {}
      cartData[itemId][size] =1
    }
    setCartItems(cartData)
  }

  const getCartCount = () => {
    let totalCount = 0;
  
    for (const items in cartItems) {
      if (cartItems[items] && typeof cartItems[items] === 'object') {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        }
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
  };
  
  const getCartAmount = async () => {
    let totalAmount = 0;
  
    for (const itemId in cartItems) {
      const cartItem = cartItems[itemId];
      const itemInfo = products.find(product => product._id === itemId); 
  
      if (itemInfo) {
        for (const size in cartItem) {
          const quantity = cartItem[size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity; 
          }
        }
      }
    }
  
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get('/api/product/list')
      if (response.data.success) {
        setProdcts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  
  useEffect(()=>{
    getProductData()
  },[ ])
  
  

  useEffect(()=>{
    console.log(cartItems);
  },[cartItems])

  const value = {
    products,
    currency,
    delivery_fee,
    serach,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount 
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider