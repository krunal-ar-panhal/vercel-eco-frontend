import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://vercel-eco-frontend.vercel.app/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || 'Failed to fetch products.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong.');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete('https://vercel-eco-frontend.vercel.app/api/product/remove', {
        data: { id },
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message || 'Failed to remove product.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong.');
    }
  };

  const addProduct = async (formData) => {
    try {
      const response = await axios.post('https://vercel-eco-frontend.vercel.app/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducts();
        return true;
      } else {
        toast.error(response.data.message || 'Failed to add product.');
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong.');
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        removeProduct,
        addProduct,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        token,
        setToken,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
