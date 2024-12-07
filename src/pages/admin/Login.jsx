import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:10000/admin/login", { mobile, password });
            localStorage.setItem("watrken_admin_token", data.token);
            navigate("/admin/profile");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const handleSignUp = async () => {
        try {
          
            await axios.post("http://localhost:10000/admin/signup", { mobile, password });
            alert("Sign Up Successful!");
        } catch (err) {
            alert("Sign Up Failed");
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <input type="number" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUp}>Sign UP</button>
        </div>
    );
};

export default Login;
