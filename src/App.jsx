import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Order from './Pages/Order';
import PlaceOrder from './Pages/PlaceOrder';
import Product from './Pages/Product';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchBar from './Components/Search';
import { Toaster } from 'react-hot-toast';
import Signup from './Pages/Signup';
import AdminLayout from './Components/AdminLayout';
import Add from './Pages/Admin/Add';
import List from './Pages/Admin/List';
import OrderAdmin from './Pages/Admin/Order';
import { UserContext } from './Context/userContext';
import Profile from './Pages/Profile';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  const { token, setToken, role, setRole } = useContext(UserContext);

  const privateRoute = ({ element }) => {
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={token && role === 'admin' ? <AdminLayout token={token} setToken={setToken} /> : <Navigate to="/login" />}
        >
          <Route index element={<Add token={token} />} />
          <Route path="add" element={<Add token={token} />} />
          <Route path="list" element={<List token={token} />} />
          <Route path="order" element={<OrderAdmin token={token} />} />
        </Route>

        {/* Non-Admin Routes wrapped in MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/collection"
          element={
            <MainLayout>
              <Collection />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login setToken={setToken} setRole={setRole} />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              {privateRoute({ element: <Profile /> })}
            </MainLayout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        />
        <Route
          path="/place"
          element={
            <MainLayout>
              {privateRoute({ element: <PlaceOrder /> })}
            </MainLayout>
          }
        />
        <Route
          path="/order"
          element={
            <MainLayout>
              {privateRoute({ element: <Order /> })}
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;