import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import '../../App.css'
import { li } from "framer-motion/client";


const C_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(20);
    const [quantity, setQuantity] = useState(1);
    const [rate, setRate] = useState(20);
    const [yourOrder, setYourOrder] = useState([{}])

    useEffect(() => {
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
        let data = await fetch("https://watrken-wb.onrender.com/customer/profile", {
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
    const increase = () => {
        setQuantity(quantity + 1)
    }
    const decrease = () => {
        setQuantity(quantity - 1)
    }
    const order = async () => {
        try {
            let result = await fetch('https://watrken-wb.onrender.com/order/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: profile.name, mobile: profile.mobile, address: profile.address, pincode: profile.pincode, quantity: quantity })
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
            let result = await fetch('https://watrken-wb.onrender.com/order/getorder', {
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
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh' }} >
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <div className="sub_header">
                <h3 className="text-white">Welcome {profile && profile.name}</h3>
                <button
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
                    <ol>
                        {
                            yourOrder && yourOrder.map((order)=>(
                                <li>{order.time}- {order.quantity}- {order.status}</li>
                            ))
                        }
                    </ol>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12"></div>
                </div>
            </div>

        </div>
    )
};

export default C_profile;
