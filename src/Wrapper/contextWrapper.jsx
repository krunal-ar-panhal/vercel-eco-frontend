import React from "react";
import { UserProvider } from "../Context/userContext";
import { ProductProvider } from "../Context/productContext";
import { ShopProvider } from "../Context/ShopContext";
import { OrderProvider } from "../Context/orderContext";

const ContextWrapper = ({ children }) => {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <ShopProvider>
            <OrderProvider>{children}</OrderProvider>
          </ShopProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
};

export default ContextWrapper;
