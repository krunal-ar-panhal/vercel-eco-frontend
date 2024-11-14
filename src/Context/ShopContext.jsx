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
  const [token, setToken] = useState('');
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

    if (token) {
      try {
        const response = await axios.post('/api/cart/add', { itemId, size }, { headers: { token } });
        console.log("Add to cart response:", response);
        toast.success("Item added to cart!");
      } catch (error) {
        console.log("Add to cart error:", error);
        toast.error(error.message);
      }
    } else {
      toast.error("You need to be logged in to add items to the cart.");
    }
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
    if (token) {
      try {
        const response = await axios.post('/api/cart/update', { itemId, size, quantity }, { headers: { token } });
        console.log("update to cart response:", response);
        toast.success(response.data.message);
      } catch (error) {
        console.log("update to cart error:", error);
        toast.error(error.message);
      }
    } else {
      toast.error("You need to be logged in to add items to the cart.");
    }
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

    const getUserCart = async ( storedToken ) => {
        try {
          const response = await axios.get('/api/cart/get',{headers:{token:storedToken}})
          console.log("get user cart response",response);
          console.log("get user cart token",storedToken);
          if (response.data.success) {
            setCartItems(response.data.cartData)
            // toast.success(response.data.message)
          }else{
            toast.error(response.data.message)
            console.log(response.data.message);
            
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
    }
  
  useEffect(()=>{
    getProductData()
  },[ ])

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken)
    }
  }, []);
  
  

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
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken  
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider