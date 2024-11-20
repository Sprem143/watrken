import { useState } from 'react'
import './App.css'
import { Route,BrowserRouter, Routes } from 'react-router-dom';
import Header from './pages/component/Header';
import Home from './pages/Home';
import DirectorProfile from './pages/Director/DirectorProfile';
import TeacherLogin from './pages/Teacher/TeacherLogin';
import DirectorLogin from './pages/Director/DirectorLogin';
import StudentRegistration from './pages/student/StudentRegistration';
import TeacherSignup from './pages/Teacher/TeacherSignup';
import StudentLogin from './pages/student/StudentLogin';
import Profile from './pages/Teacher/Profile';
import TermCondition from './pages/Term&Condition';
export default function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home/>}></Route>

        <Route path='/termcondition' element={<TermCondition/>} />
        <Route path='/customer/signup' element={<StudentRegistration/>} />
        <Route path='/customer/login' element={<StudentLogin/>} />

        <Route path='/admin/login' element={<DirectorLogin/>} />
        <Route path='/admin/profile' element={<DirectorProfile/>} />

        <Route path='/supplier/login' element={<TeacherLogin/>} />
        <Route path='/supplier/signup' element={<TeacherSignup/>} />
        <Route path='/supplier/profile' element={<Profile/>} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

