import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = {
        email,
        password,
        name,
      };

      if (currentState === 'Sign Up') {
        const response = await axios.post('/api/user/signup', formData);
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
          navigate('/login');
        }
      } else {
        const response = await axios.post('/api/user/signin', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          {currentState} Form
        </h2>
        <hr className="mb-4" />

        {/* Conditionally render the "Name" input field */}
        {currentState !== 'Login' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p className="cursor-pointer hover:text-blue-600">Forgot Password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer text-blue-600 hover:text-blue-800"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer text-blue-600 hover:text-blue-800"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
