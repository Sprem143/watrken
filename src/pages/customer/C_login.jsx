import React, { useState } from "react";
import axios from 'axios'
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const C_login = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const API = 'https://watrken-wb.onrender.com'
    const LOCAL = 'http://localhost:10000'
    const handleSignIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:10000/customer/login", { mobile, password });
            localStorage.setItem("watrken_customer_token", data.token);
            navigate("/customer/profile");
        } catch (err) {
            console.log(err)
            alert("Invalid credentials");
        }
    };



    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh' }} className="d-flex justify-content-center align-items-center">
            {loading && ( // Show spinner while loading is true
                <div className="loading-overlay">
                    <Spinner animation="border" variant="primary" /> {/* Spinner from Bootstrap */}
                </div>
            )}
            <div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"><svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="#3f89f8" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg></h4>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#3f89f8" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg>
                                </div>
                                <input type="text" className="form-control" placeholder="Username" onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#3f89f8" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg>
                                </div>
                                <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <button type="button" className="btn w-100 bg-a text-white" onClick={handleSignIn}>LOGIN</button>
                            <div className="message mt-4">
                                <div className="text-white"><input type="checkbox" /> Remember ME</div>
                                <div ><a href="#" className="text-white">Forgot your password</a></div>
                            </div>
                            <p className="text-white mt-3">New Customer? <Link to='/customer/signup'>Sign up first</Link></p>
                        </form>

                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default C_login;
