import { div } from "framer-motion/client";
import "./S_css.scss";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";

export default function S_signup() {
  const [loading,setLoading]= useState(false)
  const [name, setName]=useState(null)
  const [mobile, setMobile]= useState(null)
  const [address, setAddress] = useState(null);
  const [adhar,setAdhar]= useState(null);
  const [password,setPassword]= useState('')
  const [file, setFile] = useState(null);
  const [imgurl, setImageUrl] = useState('');
  const [adharurl, setAdharurl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handledpUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('photo', file);
    try {
      let response = await axios.post('http://localhost:10000/seller/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.url);
      setLoading(false)
    } catch(error){
      setLoading(false)
      console.log(error);
      alert(error); 
    }
  };

  const handleadharUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('photo', file);
    try {
      let response = await axios.post('http://localhost:10000/seller/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAdharurl(response.data.url);
      setLoading(false)
    } catch(error){
      setLoading(false)
      console.log(error);
      alert(error); 
    }
  };

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    alert('submit')
   try{
    let result= await fetch('http://localhost:10000/seller/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,mobile,address,adhar,password,imgurl,adharurl})
     })
     result= await result.json();
     if(result.status){
      alert('Seller successfully signed up');
      navigate("/seller/profile");

     }
   }catch(err){
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
                        <Form.Label>Adhar Number</Form.Label>
                        <Form.Control type="text" placeholder="1234 4321 1234 4321" onChange={(e)=>setAdhar(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*******" onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Adhar</Form.Label>
                        <input type="file" onChange={handleFileChange} />
      <button className="mt-2" onClick={handleadharUpload}>Upload</button>
      {adharurl && <img src={adharurl} alt="Uploaded" width="200" />}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload Photo</Form.Label>
                        <input type="file" onChange={handleFileChange} />
      <button className="mt-2" onClick={handledpUpload}>Upload</button>
     {imgurl &&  <img src={imgurl} alt="Uploaded" width="200" />}
                    </Form.Group>
                    <button class="form-field" type="submit"> Register </button>
                </Form>
            </div>
        </div>

    );
}
