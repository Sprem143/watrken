import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const S_profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
            let data = await fetch("http://localhost:10000/seller/profile", {
                method:'get',
                headers: { Authorization: `Bearer ${localStorage.getItem("watrken_seller_token")}` },
            });
            data= await data.json();
            console.log(data)
            setProfile(data);
        if(!data){
            localStorage.removeItem('watrken_seller_token');
            navigate('/seller/login')
        }
    };
    return (
        <div>
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
