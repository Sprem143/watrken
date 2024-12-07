import { div, p } from "framer-motion/client";
import "./C_css.scss";
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function C_signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [address, setAddress] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [password, setPassword] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [location, setLoc] = useState(null);
    const [file, setFile] = useState(null);
    const [imgurl, setImageUrl] = useState('');
    const [osm, setOsm] = useState('');
    const [otpsent, setotpsent]=useState(false);
    const [otp, setOtp]=useState('');
    const [otpverify,setOtpverify]=useState(false);

    const sendotp=async(e)=>{
        e.preventDefault();
        let result= await fetch('http://localhost:10000/customer/sendotp',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({mobile})
        });
        result= await result.json();
        alert(result);
        if(result.status){
            setotpsent(true)
        }
    }

    const setLocation = (address) => {
        if (address) {
            let add = address.split(',');
            setLatitude(add[0])
            setLongitude(add[1])
            if (longitude && latitude) {
                let loc = `https://www.google.com/maps?q=${add[0]},${add[1]}`;
                let loc1 = `https://www.openstreetmap.org/export/embed.html?bbox=${add[1]},${add[0]},${add[1]},${add[0]}&layer=mapnik&marker=${add[0]},${add[1]}&zoom=-5`;
                setLoc(loc);
                setOsm(loc1)
            }
        }
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleupload = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!file) {
            setLoading(false)
            return alert('Please select a file');
        }
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
        } catch (error) {
            setLoading(false)
            console.log(error);
            alert(error);
        }
    };

    const handleFormSubmit = async (e) => {
       if(name && mobile && address && pincode && location && imgurl && password){
        setLoading(true)
        e.preventDefault();
        try {
            let result = await fetch('http://localhost:10000/customer/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, mobile, address, pincode,location, imgurl, password })
            })
            result = await result.json();
            if (result.status) {
                alert('Seller successfully signed up');
                navigate("/customer/profile");
            }
            navigate('/customer/login')
            setLoading(false);
            return;
        } catch (err) {
            setLoading(false)
            console.log(err);
            alert("Error while signing up")
        }
       }else{
        alert("Please fill all details");
        return;
       }
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh', backgroundColor: '#28b6f6' }} className="d-flex justify-content-center align-items-center">
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            <div className="form-container mt-4">
                <Form className="register-form" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Bhagat Singh" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="9999999999" onChange={(e) => setMobile(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Street No-10 , Noida" onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pin code</Form.Label>
                        <Form.Control type="text" placeholder="123456" onChange={(e) => setPincode(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Lat,Long</Form.Label>
                        <Form.Control type="text" placeholder="28.5802496,77.1883008" onChange={(e) => { setLocation(e.target.value), setLl(e.target.value) }} />
                    </Form.Group>
                    <img src="/static/loc.png" alt="" />
                    <a className="mb-2" href="https://www.gps-coordinates.net" target="_blank">Find Your Longitude and Latitude</a>
                    {location && <a className="mb-2" href={location} target="_blank">See your Location on google map</a>}
                    {
                        osm &&
                        <iframe
                            title="Location Preview"
                            src={osm}
                            width="parent"
                            height="auto"
                            zoom='80%'
                            style={{ border: '1px solid black' }}
                            allowFullScreen
                        ></iframe>
                    }


                    <Form.Group className="mb-3">
                        <Form.Label>Upload Photo</Form.Label>
                        <input type="file" onChange={handleFileChange} />
                        <button className="mt-2" onClick={handleupload}>Upload</button>
                        {imgurl && <img src={imgurl} alt="Uploaded" width="200" />}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <button class="form-field" type="submit"> Register </button>
                </Form>
            </div>
            <Outlet />
        </div>

    );
}
