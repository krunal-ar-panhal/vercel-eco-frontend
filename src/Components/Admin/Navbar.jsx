import React, { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const {token, setToken} = useContext(UserContext)

    const navigate = useNavigate()

    const logout = () => {
        setToken('')
        navigate('/')
    }
 
  return (
    <div className="w-full bg-white text-gray-200 px-8 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <img src="/logo.png" alt="logo" className="w-32" />
      <button
        onClick={logout}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
