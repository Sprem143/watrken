import { div } from "framer-motion/client";
import "./C_css.scss";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";

export default function C_signup() {
  const [loading,setLoading]= useState(false)
  const [name, setName]=useState(null)
  const [mobile, setMobile]= useState(null)
  const [address, setAddress] = useState(null);
  const [pincode,setPincode]= useState(null);
  const [password,setPassword]= useState('')


  const handleFormSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault();
   try{
    let result= await fetch('https://watrken-wb.onrender.com/customer/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,mobile,address,pincode,password})
     })
     result= await result.json();
     if(result.status){
      alert('Seller successfully signed up');
      navigate("/customer/profile");
     }
     nevigate('/customer/login')
     setLoading(false)
   }catch(err){
    setLoading(false)
    console.log(err);
    alert("Error while signing up")
   }
  }

    return (
        <div style={{opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh', backgroundColor: '#28b6f6' }} className="d-flex justify-content-center align-items-center">
           {loading && ( // Show spinner while loading is true
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
        </div>
      )}
            <div className="form-container mt-4">
                <Form className="register-form" onSubmit={handleFormSubmit} >
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Bhagat Singh" onChange={(e)=>setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="9999999999" onChange={(e)=>setMobile(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Street No-10 , Noida" onChange={(e)=>setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pin code</Form.Label>
                        <Form.Control type="text" placeholder="123456" onChange={(e)=>setPincode(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*******" onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <button class="form-field" type="submit"> Register </button>
                </Form>
            </div>
        </div>

    );
}
