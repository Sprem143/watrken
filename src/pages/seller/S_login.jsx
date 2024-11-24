import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const S_login = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");
    const [loading, setLoading]=useState(false)
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:10000/seller/login", { mobile, password });
            localStorage.setItem("watrken_seller_token", data.token);
            navigate("/seller/profile");
        } catch (err) {
            console.log(err)
            alert("Invalid credentials");
        }
    };



    return (
        <div style={{opacity: loading ? 0.5 : 1, color: loading ? 'black' : null,}}>
             {loading && ( // Show spinner while loading is true
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
        </div>
      )}
            <h1>Sign In</h1>
            <input type="number" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default S_login;
