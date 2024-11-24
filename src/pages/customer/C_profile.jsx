import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import '../../App.css'
const C_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading,setLoading]= useState(false)

    useEffect(() => { 
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
            let data = await fetch("http://localhost:10000/customer/profile", {
                method:'get',
                headers: { Authorization: `Bearer ${localStorage.getItem("watrken_customer_token")}` },
            });
            data= await data.json();
            setProfile(data);
        if(!data){
            localStorage.removeItem('watrken_customer_token');
            navigate('/customer/login')
        }
    };
    return (
        <div style={{opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh'}} >
        {loading && ( 
     <div className="loading-overlay">
       <Spinner animation="border" variant="primary" /> 
     </div>
   )}

   <div className="sub_header">
   <h3 className="text-white">Welcome {profile && profile.name}</h3>
   </div>
             
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/customer/login");
                }}
            >
                Logout
            </button>
        </div>
    )
};

export default C_profile;
