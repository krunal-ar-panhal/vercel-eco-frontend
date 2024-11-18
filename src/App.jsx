import React, { useContext } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Order from './Pages/Order'
import PlaceOrder from './Pages/PlaceOrder'
import Product from './Pages/Product'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/Search'
import { Toaster } from 'react-hot-toast';
import { ShopContext } from './Context/ShopContext'

const App = () => {

  const {token} = useContext(ShopContext)

  const privateRoute = ({element}) => {
    return token ? element : <Navigate to='/login'/>
  }

  return (
    <BrowserRouter>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Toaster position="bottom-right" />
        <Navbar/>
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/place' element={privateRoute({element:<PlaceOrder/>})}/>
          <Route path='/order' element={privateRoute({element:<Order/>})}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
