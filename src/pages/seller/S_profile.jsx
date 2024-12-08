import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

import '../../App.css'
const S_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([{}]);
    const [selectedOption, setSelectedOption] = useState("");
    const [yourOrder, setYourOrder] = useState(null)
    const [unshippedOrder, setUnshippedOrder] = useState(null)
   const API = 'https://watrken-wb.onrender.com'
    const LOCAL = 'http://localhost:10000'
    useEffect(() => {
        fetchProfile(); 
        
    }, [navigate]);

    const getyourorder = async (sellerid) => {
        let orders = await fetch(`${API}/seller/getyourorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({sellerid})
        })
        orders = await orders.json();
        setYourOrder(orders)
    }

    const handleChange = (value) => {
        setSelectedOption(value);
    };
    const fetchProfile = async () => {
        let data = await fetch(`${API}/seller/profile`, {
            method: 'get',
            headers: { Authorization: `Bearer ${localStorage.getItem("watrken_seller_token")}` },
        });
        data = await data.json();
        setProfile(data);
        getorder();
        getyourorder(data._id)

        if (!data) {
            localStorage.removeItem('watrken_seller_token');
            navigate('/seller/login')
        }
    };
    const getorder = async () => {
        let orders = await fetch(`${API}/seller/getorder`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/jsonn' }
        })
        orders = await orders.json();
        console.log(orders.order)
         setUnshippedOrder(orders.order)
    }

    const changeStatus = async (id, value) => {
        try {
            const seller = profile.name;
            const sellerid= profile._id
            let res = await fetch(`${API}/seller/changestatus`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id,sellerid, value, seller })
            });
            res = await res.json();
            console.log(res.msg);
            alert(res.msg)
            if (res.err) {
                alert("Error while changing status");
                console.log(res.err);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, }}>
            <div className="sub_header">
                <h1 className="text-white">Welcome {profile !== null ? profile.mobile : null}</h1>
                <button onClick={() => { localStorage.removeItem("token"); navigate("/seller/login"); }}>
                    Logout
                </button>
            </div>

            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            <div className="p-2">
                <h3>Orders</h3>
                <Accordion className="mt-4" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header> <span className="text-white">New Orders</span></Accordion.Header>
                        <Accordion.Body>
                            <ol>
                                {
                                    Array.isArray(unshippedOrder) && unshippedOrder.map((o) => (
                                        <li className="mt-2 order">
                                            <p>Order : 20L Water </p>
                                            <p>Customer Name : {o.name}</p>
                                            <p>Location : <a href={o.location} target="_blank">Location</a></p>
                                            <p>Address : {o.address}</p>
                                            <p>Time : {o.time}</p>
                                            <p>Status : {o.status}</p>
                                            <p> Seller : {o.seller}</p>
                                            <span className="text-dark">Change Status</span>
                                            <select className="ms-2" value={selectedOption} onChange={(e) => { handleChange(e.target.value), changeStatus(o._id, e.target.value) }}>
                                                <option value="" disabled>
                                                    Status
                                                </option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </li>
                                    ))
                                }
                            </ol>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header > <span className="text-white">Your Order</span> </Accordion.Header>
                        <Accordion.Body>
                        <ol>
                                {
                                    yourOrder !== null && yourOrder.map((o) => (
                                        <li className="mt-2 order">
                                            <p>Order : 20L Water </p>
                                            <p>Customer Name : {o.name}</p>
                                            <p>Location : <a href={o.location} target="_blank">Location</a></p>
                                            <p>Address : {o.address}</p>
                                           <p> Seller : {o.seller}</p>
                                            <p>Time : {o.time}</p>
                                            <p>Status : {o.status}</p>
                                            <span className="text-dark">Change Status</span>
                                            <select className="ms-2" onChange={(e) => { handleChange(e.target.value), changeStatus(o._id, e.target.value) }}>
                                                <option value="" disabled>
                                                    Status
                                                </option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </li>
                                    ))
                                }
                            </ol>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Link to="/seller/order">See your Order History</Link>
            </div>
            <Outlet/>
        </div>

    )
};

export default S_profile;
