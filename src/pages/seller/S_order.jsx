import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

export default function S_order(){

    const navigate = useNavigate();

    const [profile,setProfile]=useState(null)
    const [del_order, setDel_Order]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        fetchProfile(); 
    }, [navigate]);

    const fetchProfile = async () => {
        let data = await fetch("http://localhost:10000/seller/profile", {
            method: 'get',
            headers: { Authorization: `Bearer ${localStorage.getItem("watrken_seller_token")}` },
        });
        data = await data.json();
        setProfile(data);
        if (!data) {
            localStorage.removeItem('watrken_seller_token');
            navigate('/seller/login')
        }else{
            getdeliveredorder(data._id);
        }
    };

    const getdeliveredorder = async (sellerid) => {
        console.log(sellerid)
        let orders = await fetch('http://localhost:10000/seller/getdeliveredorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({sellerid})
        })
        orders = await orders.json();
        setDel_Order(orders);
    }

    return(
        <>
          <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, }}>
            <div className="sub_header">
                <h1 className="text-white">Welcome {profile !== null ? profile.mobile : null}</h1>
                <button onClick={() => { localStorage.removeItem("token"); navigate("/seller/login"); }}>
                    Logout
                </button>
            </div>

            <div className="p-2">
            <Accordion className="mt-4" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header> <span className="text-white">New Orders</span></Accordion.Header>
                        <Accordion.Body>
                            <ol>
                                {
                                    Array.isArray(del_order) && del_order.map((o) => (
                                        <li className="mt-2 order">
                                            <p>Order : 20L Water </p>
                                            <p>Customer Name : {o.name}</p>
                                            <p>Location : <a href={o.location} target="_blank">Location</a></p>
                                            <p>Address : {o.address}</p>
                                            <p>Time : {o.time}</p>
                                            <p>Status : {o.status}</p>
                                            <p> Seller : {o.seller}</p>
                                        </li>
                                    ))
                                }
                            </ol>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
            </div>
        </>
    )
}
