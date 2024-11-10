import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function DirectorLogin() {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState();

    // check if there is cookie already exist-----

    useEffect(() => {
       if(document.cookie.split("=")[0]=="Director"){
        let token = document.cookie.split("=")[1]
        verifyToken(token)
       }
       
    }, [])
    const verifyToken = async (token) => {
        let result = await fetch("https://watrken-wb.onrender.com/director/verifytoken", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token }),
        })
        result = await result.json();
        if (result == true) {
            navigate('/admin/profile');
        }
    }


     
    const diplayalert = ()=>{
        alert("Please contact admin to reset your password or username \n Mob- 7366943700 || Email- prem68265@gmail.com")
    }
    const handleLogin = async () => {

        let result = await fetch("https://watrken-wb.onrender.com/director/signin", {
            method: "POST",
            body: JSON.stringify({mobile, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        if (result.token) {
            const value = result.token;
            const role = "Director"
            const cookieValue = `${role}=${value};  path=/`;
            document.cookie = cookieValue;
            navigate('/admin/profile');
        } else {
            setLoginError("Username or Password is wrong")
        }
    }
    const registerdirector = async () => {
        console.log("called")
        let result = await fetch('https://watrken-wb.onrender.com/director/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: 7366943700, password: 123 })
        });
        result = await result.json();
        alert(result);
        console.log(result)
    }
    return (
        <>
          <button onClick={registerdirector}>Register admin</button>
            <div className="loginForm dfdc jcac w-100">
                <div className="login_field dfdc jcac">
                    <h2 className="fw-bold login_title"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-lock" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg> Login as Admin</h2>

                    <div className="dfdc">
                        <label htmlFor="directorEmail">Enter Mobile</label>
                        <input type="number" id="directorEmail" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="9999999999" />
                        <label htmlFor="directorPassword">Enter Password</label>
                        <input type="text" id="directorPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                        <input type="submit" value="Login" className="mt-3 btn btn-primary" onClick={handleLogin} />

                    </div>
                    {loginError ? <span className="text-danger">{loginError}</span> : null}
                    <div className="mt-3 dfdr jcac w-100 justify-content-evenly">
                       <div className="dfdr jcac">
                       <Link className=" me-4 text-white" onClick={diplayalert}>Forget Password</Link>
                       </div>
                        <Link className="me-4 text-white" onClick={diplayalert}>Forget username</Link>
                    </div>

                </div>
            </div>

        </>
    )
}