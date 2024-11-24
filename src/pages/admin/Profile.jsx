import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        fetchProfile();
    }, [navigate]);
    const fetchProfile = async () => {
            let data = await fetch("https://watrken-wb.onrender.com/admin/profile", {
                method:'get',
                headers: { Authorization: `Bearer ${localStorage.getItem("watrken_admin_token")}` },
            });
            data= await data.json();
            setProfile(data);
        if(!data){
            localStorage.removeItem('watrken_admin_token');
            navigate('/admin/login')
        }
    };
    return (
        <div>
             <h1>Welcome, {profile && profile.mobile}</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/admin/login");
                }}
            >
                Logout
            </button>
        </div>
    )
};

export default Profile;
