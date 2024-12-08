import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import '../../App.css'

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const API = 'https://watrken-wb.onrender.com'
    const LOCAL = 'http://localhost:10000'
    useEffect(() => {
        if (localStorage.getItem("watrken_admin_token")) {
            fetchProfile();
        } else {
            navigate('/admin/login')
        }
        getorder()
    }, [navigate]);
    const fetchProfile = async () => {
        setLoading(true)
        let data = await fetch(`${API}/admin/profile`, {
            method: 'get',
            headers: { Authorization: `Bearer ${localStorage.getItem("watrken_admin_token")}` },
        });
        data = await data.json();
        setLoading(false)
        setProfile(data);
        if (!data) {
            localStorage.removeItem('watrken_admin_token');
            navigate('/admin/login')
        }
    };

    const getorder = async () => {
        let orders = await fetch(`${API}/admin/getorder`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/jsonn' }
        })
        orders = await orders.json();
        setOrder(orders.order);
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, }}>
            <div className="sub_header">
                <img src={profile !== null && profile.imgurl} alt="" height={40} />
                <h1 className="text-white">Welcome {profile !== null ? profile.mobile : null}</h1>
                <button onClick={() => { localStorage.removeItem("watrken_admin_token"); navigate("/admin/login"); }}>
                    Logout
                </button>
            </div>

            <div className="ps-4 pe-4">
                {loading && ( // Show spinner while loading is true
                    <div className="loading-overlay">
                        <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                    </div>
                )}
                <Link to='/seller/signup'>Add New Seller</Link>
                <h3>Recent Orders</h3>
                <ol>
                    {
                        order !== null && order.map((o, index) => (
                            <li key={index}>{o.time}- {o.name}- {o.quantity}-{o.status} </li>
                        ))
                    }
                </ol>
            </div>
            <Outlet />
        </div>
    )
};

export default Profile;
