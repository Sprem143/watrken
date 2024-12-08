import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import '../../App.css'
import Accordion from 'react-bootstrap/Accordion';

const C_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rate, setRate] = useState(20);
    const [yourOrder, setYourOrder] = useState([{}])
    const [changeaddress, setChangeaddress] = useState('');
    const [changepassword, setChangepassword] = useState('');
    const [newLocation, setNewlocation] = useState('');
   const API = 'https://watrken-wb.onrender.com'
    const LOCAL = 'http://localhost:10000'
    useEffect(() => {
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
        let data = await fetch(`${API}/customer/profile`, {
            method: 'get',
            headers: { Authorization: `Bearer ${localStorage.getItem("watrken_customer_token")}` },
        });
        data = await data.json();
        setProfile(data);
        if (!data) {
            localStorage.removeItem('watrken_customer_token');
            navigate('/customer/login')
        }
    };
    const setlocation = (address) => {
        if (address) {
            let add = address.split(',');
            let loc = `https://www.google.com/maps?q=${add[0]},${add[1]}`;
            setNewlocation(loc)
        } else {
            alert('Please enter Longitude latitude or after pasting value press space')
        }
    }
    const increase = () => {
        setQuantity(quantity + 1)
    }
    const decrease = () => {
        setQuantity(quantity - 1)
    }
    const order = async () => {
        try {
            let result = await fetch(`${API}/order/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: profile.name, mobile: profile.mobile, address: profile.address, pincode: profile.pincode, quantity: quantity, location: profile.location })
            })
            result = await result.json();
            alert(result);
            getorder();
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }
    const getorder = async () => {
        try {
            let result = await fetch(`${API}/order/getorder`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile: profile.mobile })
            })
            result = await result.json();
            setYourOrder(result);
            console.log(result);
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    async function changepass() {
        let result = await fetch(`${API}/customer/changepassword`, {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: profile.mobile, password: changepassword })
        });
        result = await result.json();
        console.log(result);
        alert(result);
    }
    async function changeaddr() {
        alert(changeaddress);
        alert(newLocation)
        let result = await fetch(`${API}/customer/changeaddress`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: profile.mobile, address: changeaddress, location: newLocation })
        });
        result = await result.json();
        console.log(result);
        alert(result);
    }
    const cancelorder = async (id) => {
        let result = await fetch(`${API}/customer/cancelorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        result=await result.json();
        alert(result);
        console.log(result);
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh' }} >
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <div className="sub_header">
                <h4 className="text-white">Welcome {profile && profile.name}</h4>
                <button style={{ border: 'none', boxShadow: '0' }}
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/customer/login");
                    }}
                >
                    Logout
                </button>
            </div>
            <div className="container" style={{ alignItems: 'flex-start' }}>
                <div className="row w-100">
                    <div className="col-lg-4 col-md-4 col-sm-12"></div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="order d-flex flex-column mt-4 mb-4 align-items-center p-4" style={{ border: '1px solid black', boxShadow: '0 0 10px gray' }}>
                            <p>Rate : Rs <span className="fw-bolder">{rate}</span> Rupee per Cane</p>
                            <p>Total Price : {quantity * rate}</p>
                            <div className="d-flex">
                                <input type="number" placeholder={quantity} className="me-3" style={{ width: '40px' }} onChange={(e) => setQuantity(e.target.value)} />
                                <button className="me-2" onClick={increase}>+</button>
                                <button onClick={decrease}>-</button>
                            </div>
                            <button className="mt-4" onClick={order}>Place Order</button>
                        </div>
                        <button onClick={getorder}>See Your order</button>
                        <ol>
                            {
                                yourOrder[0].mobile && yourOrder[0].mobile == profile.mobile ? yourOrder.map((order, index) => (
                                    <li key={index} className="mt-4">
                                        <div className="order">
                                            <h6>Water Bottle - 20L</h6>
                                            <p>Quantity : {order.quantity}</p>
                                            <p>Status : <span style={{color: order.status==='Cancelled'?'red': 'black'}}> {order.status}</span></p>
                                            <p>Seller : {order.seller}</p>
                                            <p>Time : {order.time}</p>
                                            <button className="mt-2" onClick={()=>cancelorder(order._id)}>Cancel Order</button>
                                        </div>
                                    </li>
                                )) : null
                            }
                        </ol>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <Accordion className="mt-4">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header> <span className="text-white">Change Address</span></Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-1">New Address</p>
                                    <input type="text" placeholder="House number 201, Noida" onChange={(e) => setChangeaddress(e.target.value)} />
                                    <p className="mb-1">New Lat,Lang</p>
                                    <input type="text" className="mb-1" placeholder="28.5802496,77.1883008" onChange={(e) => setlocation(e.target.value)} />
                                    <br />
                                    <a className="mb-2" href="https://www.gps-coordinates.net" target="_blank">Find Your Longitude and Latitude</a> <br />
                                    <button className="ms-2 mt-2" onClick={changeaddr}>Submit</button>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header > <span className="text-white">Change Password</span> </Accordion.Header>
                                <Accordion.Body>
                                    <p>New Password</p>
                                    <input type="text" placeholder="****" onChange={(e) => setChangepassword(e.target.value)} />
                                    <button className="ms-2" onClick={changepass}>Submit</button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default C_profile;
