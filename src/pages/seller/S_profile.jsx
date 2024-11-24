import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const S_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading,setLoading]= useState(false)

    useEffect(() => { 
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
            let data = await fetch("https://watrken-wb.onrender.com/seller/profile", {
                method:'get',
                headers: { Authorization: `Bearer ${localStorage.getItem("watrken_seller_token")}` },
            });
            data= await data.json();
            setProfile(data);
        if(!data){
            localStorage.removeItem('watrken_seller_token');
            navigate('/seller/login')
        }
    };
    return (
        <div style={{opacity: loading ? 0.5 : 1, color: loading ? 'black' : null,}}>
             {loading && ( // Show spinner while loading is true
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
        </div>
      )}
             <h1>Welcome {profile.name}</h1>
            <img src={profile.imgurl} alt="" width={200}/>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/seller/login");
                }}
            >
                Logout
            </button>
        </div>
    )
};

export default S_profile;
