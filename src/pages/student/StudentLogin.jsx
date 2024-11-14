import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import './student.scss'
export default function StudentLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState();
    const [login, setLogin] = useState(false);
    const [student, setStudent] = useState('');
    const [addedNotice, setAddedNotice] = useState([{}]);
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('');
    const [attendance, setAttendance]=useState(0);
    const[ day,setDay]=useState([]);

    useEffect(() => {
        getnotice();
        const cookieValue = document.cookie.split(';')
        let t= cookieValue.filter((row)=> row.includes('student'));
      if(t.length!=1){ 
        setLogin(false)
    }else{
        let token =t[0].split("=")[1]
        verifyToken(token)
        getnotice();
    }
    },[])
    const verifyToken = async (token) => {
        let result = await fetch("https://watrken-wb.onrender.com/student/verifytoken", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token:token })
        })
        result = await result.json();
        if (result.student.student) {
            getnotice();
            setLogin(true);
            setLogin(true);
            setStudent(result.student.student);
            setStudent(result.student.student);
            const dt = result.student.student.attendance;
             setAttendance(dt[1][1].length)
            var year = dt[1][0].slice(0, 4);
            setYear(year)
            for (let i = 1; i < dt.length; i++) {
                switch (dt[1][0].slice(4)) {
                    case '1':
                        setMonth('January')
                        break;
                    case '2':
                        setMonth('February')
                        break;
                    case '3':
                        setMonth('March')
                        break;
                    case '4':
                        setMonth('April')
                        break;
                    case '5':
                        setMonth('May')
                        break;
                    case '6':
                        setMonth('June')
                        break;
                    case '7':
                        setMonth('July')
                        break;
                    case '8':
                        setMonth('August')
                        break;
                    case '9':
                        setMonth('September')
                        break;
                    case '10':
                        setMonth('October')
                        break;
                    case '11':
                        setMonth('November')
                        break;
                    case '12':
                        setMonth('December')
                        break;
                    default:
                        setMonth("this")
                        break;
                }
            }
            setYear(year)
        }else{
            setLogin(false);
            setLogin(false);
        }
    }
    
    const getnotice = async () => {
        let result = await fetch("https://watrken-wb.onrender.com/notice/getnotice", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        setAddedNotice(result);
    }

    const diplayalert = () => {
        alert("Please contact Director or teacher to reset your password or username \n Mob- 7366943700 || Email- prem68265@gmail.com")
    }
    const handleLogin = async () => {
        if (login == false) {
            let result = await fetch("https://watrken-wb.onrender.com/student/signin", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            result = await result.json();
            console.log(result);
            if (result.token) {
                const value = result.token;
                let role = `student`;
                const cookieValue = `${role}=${value};  path=/`;
                document.cookie = cookieValue;
                setLogin(true);
                setStudent(result.student);
                const dt = result.student.attendance;
                // ---day by day attendance
             let day= dt[1][1];
             setDay(day);


                setAttendance(result.student.attendance[1][1].length)
                var year = dt[1][0].slice(0, 4);
                setYear(year)
                for (let i = 1; i < dt.length; i++) {
                    switch (dt[1][0].slice(4)) {
                        case '1':
                            setMonth('January')
                            break;
                        case '2':
                            setMonth('February')
                            break;
                        case '3':
                            setMonth('March')
                            break;
                        case '4':
                            setMonth('April')
                            break;
                        case '5':
                            setMonth('May')
                            break;
                        case '6':
                            setMonth('June')
                            break;
                        case '7':
                            setMonth('July')
                            break;
                        case '8':
                            setMonth('August')
                            break;
                        case '9':
                            setMonth('September')
                            break;
                        case '10':
                            setMonth('October')
                            break;
                        case '11':
                            setMonth('November')
                            break;
                        case '12':
                            setMonth('December')
                            break;
                        default:
                            setMonth("this")
                            break;
                    }
                }
                setYear(year)
            } else {
                setLoginError("Username or Password is wrong")
            }
        } else {
            setLogin(true);
        }
    }
    const logoutstudent = () => {
        Cookies.remove("student");
        navigate('/');
        setLogin(false);
    }
    return (
        <>
            {login ?
                <div className="s_profile">
                    <div className="dfdr jcac std_nav">
                        <img src={student.image} alt="Profile" className="director-img" />
                        <div className="dfdc jcac" style={{ flexBasis: "60%" }}>
                            <h3><b className="text-white">{student.username}</b></h3>
                            <h6 className="text-white">Role:Student</h6>
                        </div>
                        <button className="btn btn-primary logout_btn" onClick={logoutstudent}>Log out</button>
                    </div>
                    <div className="student_profile dfdc jcac w-100">
                        <div className="std_profile_table mt-3 mb-3">
                            <h2 className="text-center bottom_border mb-4">Profile</h2>
                            <div className="dfdr details">
                                <div className="dfdr">
                                    <div className="dfdc std_row">
                                        <b className="fw-bold">Class: </b>
                                        <b className="fw-bold">Gender: </b>
                                        <b className="fw-bold">Mobile Number: </b>
                                        <b className="fw-bold">Email: </b>
                                        <b className="fw-bold">Father's Name: </b>
                                        <b className="fw-bold">Address: </b>
                                        <b className="fw-bold">Date of Birth: </b>
                                        <b className="fw-bold">Admission Date: </b>
                                        <b className="fw-bold">Attendance in {month}/{year}: </b>
                                        <b className="fw-bold">Present Days: {month}/{year}: </b>

                                    </div>
                                    <div className="std_row">
                                        <p>{student.standard}</p>
                                        <p>{student.gender}</p>
                                        <p>{student.mobile}</p>
                                        <p>{student.email}</p>
                                        <p>{student.fatherName}</p>
                                        <p>{student.address}</p>
                                        <p>{student.dob}</p>
                                        <p>{student.createdAt.slice(0, 10)}</p>
                                        <p>{attendance} day</p>
                                        
                                    </div>
                                </div>
                                <div className="notice">
                                    <h4 className="text-center text-danger bg-white p-2">Notice Board</h4>
                                    <ol className="pt-4 mt-4">
                                        {
                                            addedNotice.map((notice) => (
                                                <li><b>{notice.noticeWriter}</b> {notice.notice} <br /> <p>{notice.date}</p></li>
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                :


                <div className="loginForm dfdc jcac w-100">
                    <div className="login_field dfdc jcac">
                        <h2 className="fw-bold login_title"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-person-lock" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                        </svg> Login as Customer</h2>

                        <div className="dfdc">
                            <label htmlFor="directorEmail">Enter Email</label>
                            <input type="text" id="directorEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" />
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


            }


        </>
    )
}