import { useState } from 'react'
import './App.css'
import { Route,BrowserRouter, Routes } from 'react-router-dom';
import Header from './pages/component/Header';
import Home from './pages/Home';

import Login from './pages/admin/Login';
import Profile from './pages/admin/Profile';
import S_signup from './pages/seller/S_signup';
import S_login from './pages/seller/S_login';
import S_profile from './pages/seller/S_profile';
import C_login from './pages/customer/C_login';
import C_profile from './pages/customer/C_profile';
import C_signup from './pages/customer/C_signup';

import TermCondition from './pages/Term&Condition';
export default function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home/>}></Route>

        <Route path='/termcondition' element={<TermCondition/>} />

        <Route path='/admin/login' element={<Login/>} />
        <Route path='/admin/profile' element={<Profile/>} />


        <Route path='/seller/profile' element={<S_profile/>} />
        <Route path='/seller/signup' element={<S_signup/>} />
        <Route path='/seller/login' element={<S_login/>} />

        <Route path='/customer/profile' element={<C_profile/>} />
        <Route path='/customer/signup' element={<C_signup/>} />
        <Route path='/customer/login' element={<C_login/>} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

