import { createContext, useState } from "react";
import { products } from "../../public/assets";
console.log(products);


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [serach , setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const value = {
    products,
    currency,
    delivery_fee,
    serach,
    setSearch,
    showSearch,
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider