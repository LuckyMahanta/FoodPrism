import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './component/navbar/Navbar'
import Home from './component/home/Home'
import Menu from './component/menu/Menu';
import Login from './component/login/Login';
import Register from './component/register/Register';
import { Toaster } from 'react-hot-toast';
import UploadProduct from './component/product/UploadProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './component/redux/ProductSlide';
import Cart from './component/cart/Cart'
import Success from "./component/after_payment/Success";
import Cancel from "./component/after_payment/Cancel";

function App() {

  const dispatch= useDispatch()
  const productData = useSelector((state)=>state.product)
  useEffect(()=> {
    (async()=> {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  }, [])

  return (
    <div className='bg-slate-100 min-h-[calc(100vh)]'>
      <Toaster />
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uploadProduct" element={<UploadProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
