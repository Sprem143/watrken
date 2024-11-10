import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './director.scss'
import Form from 'react-bootstrap/Form';
import 'react-multi-carousel/lib/styles.css';

export default function DirectorProfile() {


    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [std, setStd] = useState('');
    const [tchr, sett] = useState('');

    const [stdName, setStdname] = useState('');
    const [stdFatherName, setStdFatherName] = useState('');
    const [stdEmail, setStdEmail] = useState('');
    const [stdMobile, setStdMobile] = useState('');
    const [stdDob, setStdDob] = useState('');
    const [stdClass, setStdClass] = useState('');
    const [stdGender, setStdGender] = useState('');
    const [stdAddress, setStdAddress] = useState('');

    const [tName, settname] = useState('');
    const [tFatherName, settFatherName] = useState('');
    const [tEmail, settEmail] = useState('');
    const [tMobile, settMobile] = useState('');
    const [tSubject, settSubject] = useState('');
    const [tSalary, settSalary] = useState('');
    const [tGender, settGender] = useState('');
    const [tAddress, settAddress] = useState('');

    const [st, setSt] = useState('');
    const [ss, setSs] = useState('');
    const [ssClass, setSsClass] = useState('');
    const [searchedStudent, setSearchedStudent] = useState([]);
    const [searchedTeacher, setSearchedTeacher] = useState([]);
    const [classSt, setClassSt] = useState([]);
    const [studentArray, setStudentArray] = useState([]);
    const [pStudent, setPStudent] = useState([]);
    const [showButton, setShowButton] = useState(false)
    const [attendenceClass, setac] = useState('');
    const [totalPresentStudent, settps] = useState(0);
    const [psList, setPSList] = useState([{}]);
    const [cwps, setCwps] = useState([]);
    const [aClass, setaCls] = useState('');
    const [tpt, settpt] = useState(0);

    const [notice, setNotice] = useState('');
    const [noticeWriter, setNoticeWriter] = useState('');
    const [addedNotice, setAddedNotice] = useState([{}]);
    const [date, setDate] = useState('');
    const [ClassOfAttendance, setClassOfAttendance] = useState("")


    const submitNotice = async () => {
        let d = new Date();
        const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
        setDate(date);
        let result = await fetch('https://watrken-wb.onrender.com/notice/addnotice', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ noticeWriter, notice, date })
        });
        result = await result.json();
        if (result) {
            getnotice();
            alert("Notice added successfully")
        } else {
            alert('Error While adding notice')
        }
    }

    useEffect(() => {

        if (document.cookie) {
            const cookieValue = document.cookie
            if (!cookieValue) { navigate('/director/login') }
            let token = cookieValue.split("=")[1]
            verifyToken(token)
        } else {
            navigate('/director/login')
        }
        noofpresentstudent();
        getnotice();
    }, [])
    const verifyToken = async (token) => {
        let key = token.split(' ')[0];
        let result = await fetch("https://watrken-wb.onrender.com/director/verifytoken", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: key })
        })
        result = await result.json();
        console.log(result)
        if (result == false) {
            navigate('/director/login');
        }
    }
    const getnotice = async () => {
        let result = await fetch("https://watrken-wb.onrender.com/notice/getnotice", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        setAddedNotice(result);
        setAddedNotice(result);
        addedNotice.unshift({ noticeWriter, notice, date });
    }

    const noofpresentstudent = async () => {
        let d = new Date();
        const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

        let result = await fetch("https://watrken-wb.onrender.com/director/noofpresentstudent", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date })
        })
        result = await result.json();

        let totalStudent = 0;
        result.s.map((c) => {
            totalStudent = totalStudent + c.totalStudent;
        })
        settps(totalStudent);
        setPSList(result);
        settpt(result.t.length);

    }

    const setPresent = async (ps, email) => {
        setShowButton(true);
        let d = new Date();
        const date = d.getDate();
        const yearmonth = `${d.getFullYear()}${d.getMonth() + 1}`
        let result = await fetch("https://watrken-wb.onrender.com/director/setattendance", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, yearmonth, date })
        })
        result = await result.json();
        if (result.message==="Attendance already submitted") {
            alert(result.message)
          setStudentArray([]);
          setStudentArray([]);
        }else{
            let newStd = { username: ps, email: email }
            pStudent.unshift(newStd);
        }
    }

    const getAttendence = async (e) => {
        setCwps([]);
        let clas = e.target.value;
        setClassOfAttendance(clas)
        let presentStudent = await fetch("https://watrken-wb.onrender.com/director/getattendance", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clas })
        })
        presentStudent = await presentStudent.json();
        setCwps(presentStudent)
        setCwps(presentStudent)
    }

    const submitAttendance = async () => {
        //    alert(pStudent.length);
        let date = new Date();
        const dateNow = `${date.getDate()}/${parseInt(date.getMonth()) + parseInt(1)}/${date.getFullYear()}`;
        const totalStudent = pStudent.length;
        console.log(pStudent, attendenceClass, dateNow, totalStudent)
        let result = await fetch("https://watrken-wb.onrender.com/director/attendence", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pStudent, attendenceClass, dateNow, totalStudent })
        })
        result = await result.json();
        alert(result.message);
        setPStudent(result);
        setPStudent(result);
        noofpresentstudent();
        document.getElementById('attendance').style.visibility = 'hidden'
        document.getElementById('attendance').style.position = 'fixed'
    }

    const handleSelectChange = (event) => {
        setSsClass(event.target.value);
    };
    const filterStudent = async (event) => {
        let cls = event.target.value;
        let result = await fetch("https://watrken-wb.onrender.com/director/getclassstudent", {
            method: "POST",
            body: JSON.stringify({ cls }),
            headers: { 'Content-Type': 'application/json' }
        })
        result = await result.json();
        setClassSt(result);
    };

    const getStudent = async (event) => {
        let cls = event.target.value;
        setac(cls);
        let result = await fetch("https://watrken-wb.onrender.com/director/getclassstudent", {
            method: "POST",
            body: JSON.stringify({ cls }),
            headers: { 'Content-Type': 'application/json' }
        })
        result = await result.json();
        setStudentArray(result);
    };

    const getStudents = async () => {
        let students = await fetch('https://watrken-wb.onrender.com/director/getAllStudents', {
            method: "GET",
            headers: { 'Content-type': 'application/json' }
        })
        students = await students.json();
        setStudents(students);
    }
    // -----get teachers list

    const getteachers = async () => {
        let teachers = await fetch('https://watrken-wb.onrender.com/director/getallteachers', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
        teachers = await teachers.json();
        setTeachers(teachers);
    }

    const searchTeacher = async () => {
        let tresult = await fetch("https://watrken-wb.onrender.com/director/searchteacher", {
            method: "POST",
            body: JSON.stringify({ st }),
            headers: { 'Content-Type': "application/json" }
        })
        tresult = await tresult.json();
        if (tresult.length > 0) {
            setSearchedTeacher(tresult);
        } else {
            alert(tresult.message);
        }
    }

    const searchstudent = async () => {
        let sresult = await fetch("https://watrken-wb.onrender.com/director/searchstudent", {
            method: "POST",
            body: JSON.stringify({ ss }),
            headers: { 'Content-Type': "application/json" }
        })
        sresult = await sresult.json();
        if (sresult.length > 0) {
            setSearchedStudent(sresult);
        } else {
            alert(sresult.message);
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    // ---------student updation operation --------------
    const handleShow = async (em) => {
        setStd("");
        setShow(true);
        let std = await fetch('https://watrken-wb.onrender.com/director/getonestudent', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: em })
        })
        std = await std.json();
        setStd(std);
        setStd(std);
    }

    const handleUpdate = async (stdupdate) => {
        setShow(false);
        let Email = stdupdate.email;
        let updatedstd = await fetch("https://watrken-wb.onrender.com/director/updatestudent", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email, stdName, stdEmail, stdMobile, stdDob, stdFatherName, stdClass, stdGender, stdAddress })
        })
        updatedstd = await updatedstd.json();
        if (updatedstd.email) {
            alert('Student details updated successfully')
        }
    }

    // ----------teacher update operation---------------
    const handletShow = async (t) => {
        setShow(true);
        let tchr = await fetch('https://watrken-wb.onrender.com/director/getoneteacher', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: t })
        })
        tchr = await tchr.json();
        sett(tchr);
    }

    const handletUpdate = async (stdupdate) => {
        setShow(false);
        let Email = stdupdate.email;
        let updatedstd = await fetch("https://watrken-wb.onrender.com/director/updateteacher", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email, tName, tEmail, tMobile, tFatherName, tSubject, tGender, tAddress, tSalary })
        })
        updatedstd = await updatedstd.json();
        if (updatedstd.email) {
            alert('Student details updated successfully')
        }
    }

    const deleteStudent = async (email) => {
        let status = await fetch('https://watrken-wb.onrender.com/director/removestudent', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        status = await status.json();
        if (status.status == 200) {
            alert("student deleted")
        } else {
            alert("Error while deleting")
        }
    }
    // -----Log out ----
    const logout = () => {
        Cookies.remove('Director');
        navigate('/');
    }
    return (
        <>
            <div className="df dfdr">
                <img src="/static/Prem.png" alt="Profile" className="director-img" />
                <div className="dfdc jcac" style={{ flexBasis: "60%" }}>
                    <h3><b>Mr Prem Kumar</b></h3>
                    <h6>Role: Director of school</h6>
                </div>

                <button className="btn btn-primary logout_btn" onClick={logout}>Log out</button>
            </div>

            <div className="dfdr jcac mt-4 director_body">
                <Accordion className="director_acordian bg-dark" defaultActiveKey={['1']} alwaysOpen>
                    {/*---------- Teacher part---------- */}
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header>
                            <div className="dfdr jcac justify-content-evenly">
                                <img src="/static/teacher.webp" alt="" className="me-4 ms-4" style={{ border: "1px solid grey", width: "35px" }} />
                                <h4 className="me-4 ms-4">Supplier</h4>
                                <div className="noofstd dfdr jcac">
                                    <h5 className="me-4 text-danger hd"> Total Supplier &nbsp;&nbsp;</h5>
                                    <div onLoad={noofpresentstudent} className="dfdr jcac">
                                        <div className="brdr dfdr jcac"></div>
                                        <div className="pr_std dfdr jcac">
                                            <h5 className="mb-0 text-success fw-bold">{tpt}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Accordion.Header>
                        <Accordion.Body>
                            <section className="dfdr jcac">
                                <div className="teacher_sec dfdc jcac">
                                    <h1 className="text-danger bottom_border"><b>Teacher</b></h1>
                                    <div className="dfdr jcac tchr">
                                        <div className="teacher_img ">
                                            <img src="/static/teacher.png" alt="Teacher logo" />
                                        </div>
                                        <div className="teacher_action dfdc">
                                            <Link to="/teacher/signup"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus me-3" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                            </svg> Add New Teacher</Link>
                                            <Link onClick={getteachers}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-list me-3" viewBox="0 0 16 16">
                                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                            </svg> All Teachers List</Link>
                                            <Link><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search me-3 " viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                            </svg> Search a Teacher</Link>
                                            <input type="text" className="mt-2 p-1" placeholder="Enter teacher's name" onChange={(e) => setSt(e.target.value)} />
                                            <button className="btn btn-primary mt-2" onClick={searchTeacher}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* -----------student part----------- */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="dfdr">
                                <img src="/static/student.jpg" alt="student" className="me-4 ms-4" style={{ border: "1px solid grey", width: "35px", height: "40px" }} />
                                <h4 className="ms-4 me-4 mt-1">Customer</h4>
                                <div className="noofstd dfdr jcac">
                                    <h5 className="me-4 text-danger hd">Total Customers</h5>
                                    <div onLoad={noofpresentstudent} className="dfdr jcac">
                                        <div className="brdr dfdr jcac"></div>
                                        <div className="pr_std dfdr jcac">
                                            <h5 className="mb-0 text-success fw-bold">{totalPresentStudent}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Accordion.Header>
                        <Accordion.Body>
                            <section className="dfdr jcac">
                                <div className="student_sec dfdc jcac mb-4">
                                    <h1 className="text-danger bottom_border"><b> STUDENT</b></h1>
                                    <div className="dfdr jcac tchr">
                                        <div className="teacher_img">
                                            <img src="/static/student1.avif" alt="Teacher logo" />
                                        </div>
                                        <div className="teacher_action dfdc">
                                            <Link to="/student/signup"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus me-3" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                            </svg> Add New Student</Link>
                                            <Link onClick={getStudents}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-list me-3" viewBox="0 0 16 16">
                                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                            </svg> All Students List</Link>

                                            <Link><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search me-3 " viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                            </svg> Search a Student</Link>
                                            <input type="text" className="mt-2 p-1" style={{ marginLeft: "3vw" }} placeholder="Enter student's name" onChange={(e) => setSs(e.target.value)} />
                                            <button className="btn btn-primary mt-2" style={{ marginLeft: "3vw" }} onClick={searchstudent}>Search</button>
                                        </div>
                                        <div className="dfdc teacher_action">
                                            <Link >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" me-3 bi bi-people-fill" viewBox="0 0 16 16">
                                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                                </svg>
                                                Class Students
                                            </Link>
                                            <div className="dfdr">
                                                <select className='mt-1 s_l' onChange={filterStudent}>
                                                    <option >Select Class</option>
                                                    <option value="I">I</option>
                                                    <option value="II" >II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV" >IV</option>
                                                    <option value="V">V</option>
                                                    <option value="VI">VI</option>
                                                    <option value="VII">VII</option>
                                                    <option value="VIII" >VIII</option>
                                                    <option value="IX">IX</option>
                                                    <option value="X">X</option>
                                                    <option value="DELED">XI</option>
                                                    <option value="Ph.D">XII</option>/
                                                </select>
                                            </div>
                                            <Link >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-3 bi bi-list-check" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                                </svg>
                                                Make Attandance
                                            </Link>
                                            <div className="dfdr">
                                                <select className='mt-1 s_l' onChange={getStudent}>
                                                    <option >Select Class</option>
                                                    <option value="I">I</option>
                                                    <option value="II" >II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV" >IV</option>
                                                    <option value="V">V</option>
                                                    <option value="VI">VI</option>
                                                    <option value="VII">VII</option>
                                                    <option value="VIII" >VIII</option>
                                                    <option value="IX">IX</option>
                                                    <option value="X">X</option>

                                                </select>
                                            </div>

                                            <Link >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="me-3 bi bi-list-check" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                                </svg>
                                                See Attandance
                                            </Link>
                                            <div className="dfdr">
                                                <select className='mt-1 s_l' onChange={getAttendence}>
                                                    <option >Select Class</option>
                                                    <option value="I">I</option>
                                                    <option value="II" >II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV" >IV</option>
                                                    <option value="V">V</option>
                                                    <option value="VI">VI</option>
                                                    <option value="VII">VII</option>
                                                    <option value="VIII" >VIII</option>
                                                    <option value="IX">IX</option>
                                                    <option value="X">X</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="dfdc">
                    {/* ----add notice---------- */}
                    <div className="notice_input">
                        <h5 className="text-center text-white bg-primary p-2">Add Notice</h5>
                        <div className="p-1 notice_input">
                            <b>Your Name </b>
                            <input type="text" placeholder="Add text here" onChange={(e) => setNoticeWriter(e.target.value)} />
                            <b>Notice</b>
                            <textarea name="" id="" cols="22" rows="4" onChange={(e) => setNotice(e.target.value)}></textarea>
                            {notice ? <button className="btn btn-primary" onClick={submitNotice}>Submit</button> : null}
                        </div>
                    </div>
                    {/* -------notice board--- */}
                    <div className="notice_output mt-1">
                        <h4 className="text-center text-white bg-success p-2">Notice Board</h4>
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


            {/* searched teacher list -- */}
            {teachers.length > 0 ? <div className="list_view mb-3 mt-3">
                <ol className="mt-4">
                    {
                        searchedTeacher.map((teacher) => (
                            <li key={teacher._id}>
                                <Accordion >
                                    <Accordion.Item eventKey={teacher._id}>
                                        <Accordion.Header>
                                            <div className="dfdr student_table">
                                                <img src={teacher.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                                <p className="fw-bold std_name"> {teacher.username}</p>
                                                <a variant="primary" onClick={() => handletShow(teacher.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> <span className="hd">Update</span> </a>
                                                <a onClick={() => deleteStudent(teacher.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg> <span className="hd">Delete</span></a>
                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{std.username}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="updateForm_c p-3 bg-success">
                                                    <form action="" className="update_f dfdr justify-content-between">
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label >Name</label>
                                                                <input type="text" defaultValue={tchr.username} onChange={(e) => settname(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label >Email</label>
                                                                <input type="text" defaultValue={tchr.email} onChange={(e) => settEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Mobile</label>
                                                                <input type="text" defaultValue={tchr.mobile} onChange={(e) => settMobile(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Subject</label>
                                                                <input type="text" defaultValue={tchr.subject} onChange={(e) => settSubject(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label>Father's Name</label>
                                                                <input type="text" defaultValue={tchr.fatherName} onChange={(e) => settFatherName(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Salary</label>
                                                                <input type="Date" defaultValue={tchr.salary} onChange={(e) => settSalary(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Address</label>
                                                                <input type="text" defaultValue={tchr.address} onChange={(e) => settAddress(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Gender</label>
                                                                {['radio'].map((type) => (
                                                                    <div className="mb-1">
                                                                        <Form.Check
                                                                            value="Male" onClick={() => setStdGender("Male")}
                                                                            inline label="Male" name="group1" id="male" type={type} />
                                                                        <Form.Check
                                                                            value="Female" onClick={() => setStdGender("Female")}
                                                                            inline label="Female" name="group1" id="female" type={type} />
                                                                    </div>
                                                                ))}                                                        </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => handletUpdate(teacher)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="dfdc jcac std_details">
                                                <h2>{std.username}</h2>
                                                <div className="dfdr jcac std_container">
                                                    <div className="std_photo">
                                                        <img src={teacher.image} alt="teacher photo" height="200" />
                                                    </div>
                                                    <div className="std_data">
                                                        <table border={1}>
                                                            <tbody>
                                                                <tr >
                                                                    <td >Mobile Number : </td>
                                                                    <td>{teacher.mobile}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Email : </td>
                                                                    <td>{teacher.email}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Gender</td>
                                                                    <td>{teacher.gender}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Address : </td>
                                                                    <td>{teacher.address}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Father's Name : </td>
                                                                    <td>{teacher.fatherName}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Subject : </td>
                                                                    <td>{teacher.subject}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Qualification : </td>
                                                                    <td>{teacher.qualification}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Salary : </td>
                                                                    <td>{teacher.salary}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Joining Date : </td>
                                                                    <td>{teacher.createdAt.slice(0, 10)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        ))
                    }
                </ol>
            </div> : null}

            {/* ---all  teacher list--------- */}
            {teachers.length > 0 ? <div className="list_view mb-3">
                <ol className="mt-4">
                    {
                        teachers.map((teacher) => (
                            <li key={teacher._id}>
                                <Accordion >
                                    <Accordion.Item eventKey={teacher._id}>
                                        <Accordion.Header>
                                            <div className="dfdr student_table">
                                                <img src={teacher.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                                <p className="fw-bold std_name"> {teacher.username}</p>
                                                <a variant="primary" onClick={() => handletShow(teacher.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> <span className="hd">Update</span> </a>
                                                <a onClick={() => deleteStudent(teacher.email)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg> <span className="hd">Delete</span></a>
                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{std.username}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="updateForm_c p-3 bg-success">
                                                    <form action="" className="update_f dfdr justify-content-between">
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label >Name</label>
                                                                <input type="text" defaultValue={tchr.username} onChange={(e) => settname(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label >Email</label>
                                                                <input type="text" defaultValue={tchr.email} onChange={(e) => settEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Mobile</label>
                                                                <input type="text" defaultValue={tchr.mobile} onChange={(e) => settMobile(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Subject</label>
                                                                <input type="text" defaultValue={tchr.subject} onChange={(e) => settSubject(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label>Father's Name</label>
                                                                <input type="text" defaultValue={tchr.fatherName} onChange={(e) => settFatherName(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Salary</label>
                                                                <input type="Date" defaultValue={tchr.salary} onChange={(e) => settSalary(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Address</label>
                                                                <input type="text" defaultValue={tchr.address} onChange={(e) => settAddress(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Gender</label>
                                                                {['radio'].map((type) => (
                                                                    <div className="mb-1">
                                                                        <Form.Check
                                                                            value="Male" onClick={() => setStdGender("Male")}
                                                                            inline label="Male" name="group1" id="male" type={type} />
                                                                        <Form.Check
                                                                            value="Female" onClick={() => setStdGender("Female")}
                                                                            inline label="Female" name="group1" id="female" type={type} />
                                                                    </div>
                                                                ))}                                                        </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => handletUpdate(teacher)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="dfdc jcac std_details">
                                                <h2>{std.username}</h2>
                                                <div className="dfdr jcac std_container">
                                                    <div className="std_photo">
                                                        <img src={teacher.image} alt="teacher photo" height="200" />
                                                    </div>
                                                    <div className="std_data">
                                                        <table border={1}>
                                                            <tbody>
                                                                <tr >
                                                                    <td >Mobile Number : </td>
                                                                    <td>{teacher.mobile}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Email : </td>
                                                                    <td>{teacher.email}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Gender</td>
                                                                    <td>{teacher.gender}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Address : </td>
                                                                    <td>{teacher.address}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Father's Name : </td>
                                                                    <td>{teacher.fatherName}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Subject : </td>
                                                                    <td>{teacher.subject}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Qualification : </td>
                                                                    <td>{teacher.qualification}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Salary : </td>
                                                                    <td>{teacher.salary}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Joining Date : </td>
                                                                    <td>{teacher.createdAt.slice(0, 10)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        ))
                    }
                </ol>
            </div> : null}

            {/* ----------searched students will display here--------- */}
            {students.length > 0 ? <div className="list_view mb-3">
                <ol>
                    <h4 className="text-center mb-3 bottom_border">All Students of School (Total: {students.length})
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setStudents([])} style={{ marginLeft: '10vw' }} width="25" height="25" fill="currentColor" className="mb-2 bi bi-x-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                        </svg>
                    </h4>
                    {
                        students.map((student) => (
                            <li key={student.email}>
                                <Accordion >
                                    <Accordion.Item eventKey={student._id}>
                                        <Accordion.Header>
                                            <div className="dfdr student_table">
                                                <img src={student.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                                <p className="fw-bold std_name"> {student.username}</p>
                                                <a variant="primary" onClick={() => handleShow(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> <span className="hd">Update</span>
                                                </a>
                                                <a onClick={() => deleteStudent(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg> <span className="hd">Delete</span> </a>

                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{std.username}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="updateForm_c p-3 bg-success">
                                                    <form action="" className="update_f dfdr justify-content-between">
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label >Name</label>
                                                                <input type="text" defaultValue={std.username} onChange={(e) => setStdname(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label >Email</label>
                                                                <input type="text" defaultValue={std.email} onChange={(e) => setStdEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Mobile</label>
                                                                <input type="text" defaultValue={std.mobile} onChange={(e) => setStdMobile(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>class</label>
                                                                <select className='mt-1' value={stdClass} onChange={handleSelectChange}>                            <option value="">Select qualification</option>
                                                                    <option value="I">I</option>
                                                                    <option value="II" >II</option>
                                                                    <option value="III">III</option>
                                                                    <option value="IV" >IV</option>
                                                                    <option value="V">V</option>
                                                                    <option value="VI">VI</option>
                                                                    <option value="VII">VII</option>
                                                                    <option value="VIII" >VIII</option>
                                                                    <option value="IX">IX</option>
                                                                    <option value="X">X</option>
                                                                    <option value="DELED">XI</option>
                                                                    <option value="Ph.D">XII</option>/
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label>Father's Name</label>
                                                                <input type="text" defaultValue={std.fatherName} onChange={(e) => setStdFatherName(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>DOB</label>
                                                                <input type="Date" defaultValue={std.dob} onChange={(e) => setStdDob(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Address</label>
                                                                <input type="text" defaultValue={std.address} onChange={(e) => setStdAddress(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Gender</label>
                                                                {['radio'].map((type) => (
                                                                    <div className="mb-1">
                                                                        <Form.Check
                                                                            value="Male" onClick={() => setStdGender("Male")}
                                                                            inline label="Male" name="group1" id="male" type={type} />
                                                                        <Form.Check
                                                                            value="Female" onClick={() => setStdGender("Female")}
                                                                            inline label="Female" name="group1" id="female" type={type} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => handleUpdate(student)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="dfdc jcac std_details">
                                                <h2>{std.username}</h2>
                                                <div className="dfdr jcac std_container">
                                                    <div className="std_photo">
                                                        <img src={student.image} alt="student photo" height="200" />
                                                    </div>
                                                    <div className="std_data">
                                                        <table border={1}>
                                                            <tbody>
                                                                <tr >
                                                                    <td>Gender</td>
                                                                    <td >{student.gender}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td>Class</td>
                                                                    <td >{student.standard}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td >Father's Name</td>
                                                                    <td>{student.fatherName}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >DOB</td>
                                                                    <td>{student.dob}</td>
                                                                </tr>


                                                                <tr >
                                                                    <td >Contact Number</td>
                                                                    <td>{student.mobile}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Email</td>
                                                                    <td>{student.email}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Address</td>
                                                                    <td>{student.address}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Admission Date</td>
                                                                    <td>{student.createdAt.slice(0, 10)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        ))
                    }
                </ol>
            </div> : null}


            {/* filterer student class wise */}
            {classSt.length > 0 ? <div className="list_view mb-3">
                <h4 className="text-center mb-3 text-white bottom_border">All Students of class: {classSt[0].standard}
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setClassSt([])} style={{ marginLeft: '10vw' }} width="25" height="25" fill="currentColor" className="mb-2 bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </h4>
                <ol>
                    {
                        classSt.map((student) => (
                            <li key={student.email}>
                                <Accordion >
                                    <Accordion.Item eventKey={student._id}>
                                        <Accordion.Header>
                                            <div className="dfdr student_table">
                                                <img src={student.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                                <p className="fw-bold std_name"> {student.username}</p>
                                                <a variant="primary" onClick={() => handleShow(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> <span className="hd">Update</span>  </a>
                                                <a onClick={() => deleteStudent(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg> <span className="hd">Delete</span></a>
                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{std.username}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="updateForm_c p-3 bg-success">
                                                    <form action="" className="update_f dfdr justify-content-between">
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label >Name</label>
                                                                <input type="text" defaultValue={std.username} onChange={(e) => setStdname(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label >Email</label>
                                                                <input type="text" defaultValue={std.email} onChange={(e) => setStdEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Mobile</label>
                                                                <input type="text" defaultValue={std.mobile} onChange={(e) => setStdMobile(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>class</label>
                                                                <select className='mt-1' value={stdClass} onChange={handleSelectChange}>                            <option value="">Select qualification</option>
                                                                    <option value="I">I</option>
                                                                    <option value="II" >II</option>
                                                                    <option value="III">III</option>
                                                                    <option value="IV" >IV</option>
                                                                    <option value="V">V</option>
                                                                    <option value="VI">VI</option>
                                                                    <option value="VII">VII</option>
                                                                    <option value="VIII" >VIII</option>
                                                                    <option value="IX">IX</option>
                                                                    <option value="X">X</option>
                                                                    <option value="DELED">XI</option>
                                                                    <option value="Ph.D">XII</option>/
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label>Father's Name</label>
                                                                <input type="text" defaultValue={std.fatherName} onChange={(e) => setStdFatherName(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>DOB</label>
                                                                <input type="Date" defaultValue={std.dob} onChange={(e) => setStdDob(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Address</label>
                                                                <input type="text" defaultValue={std.address} onChange={(e) => setStdAddress(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Gender</label>
                                                                {['radio'].map((type) => (
                                                                    <div className="mb-1">
                                                                        <Form.Check
                                                                            value="Male" onClick={() => setStdGender("Male")}
                                                                            inline label="Male" name="group1" id="male" type={type} />
                                                                        <Form.Check
                                                                            value="Female" onClick={() => setStdGender("Female")}
                                                                            inline label="Female" name="group1" id="female" type={type} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => handleUpdate(student)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="dfdc jcac std_details">
                                                <h2>{student.username}</h2>
                                                <div className="dfdr jcac std_container">
                                                    <div className="std_photo">
                                                        <img src={student.image} alt="student photo" height="200" />
                                                    </div>
                                                    <div className="std_data">
                                                        <table border={1}>
                                                            <tbody>
                                                                <tr >
                                                                    <td>Gender</td>
                                                                    <td >{student.gender}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td>Class</td>
                                                                    <td >{student.standard}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td >Father's Name</td>
                                                                    <td>{student.fatherName}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >DOB</td>
                                                                    <td>{student.dob}</td>
                                                                </tr>


                                                                <tr >
                                                                    <td >Contact Number</td>
                                                                    <td>{student.mobile}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Email</td>
                                                                    <td>{student.email}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Address</td>
                                                                    <td>{student.address}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Admission Date</td>
                                                                    <td>{student.createdAt.slice(0, 10)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        ))
                    }
                </ol>
            </div> : null}
            {/* -----setudent search result--------------- */}
            {searchedStudent.length > 0 ? <div className="list_view mt-2 mb-3">
                <h5 className="text-center mb-3 text-white bottom_border">Search result (Total matched names found: {searchedStudent.length})
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setSearchedStudent([])} style={{ marginLeft: '10vw' }} width="25" height="25" fill="currentColor" className="mb-2 bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </h5>
                <ol>
                    {
                        searchedStudent.map((student) => (
                            <li key={student._id}>
                                <Accordion >
                                    <Accordion.Item eventKey={student._id}>
                                        <Accordion.Header>
                                            <div className="dfdr student_table">
                                                <img src={student.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                                <p className="fw-bold std_name"> {student.username}</p>
                                                <a variant="primary" onClick={() => handleShow(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> <span className="hd">Update</span></a>
                                                <a onClick={() => deleteStudent(student.email)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg> <span className="hd">Delete</span> </a>
                                            </div>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{std.username}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="updateForm_c p-3 bg-success">
                                                    <form action="" className="update_f dfdr justify-content-between">
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label >Name of student</label>
                                                                <input type="text" defaultValue={std.username} onChange={(e) => setStdname(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label >Email</label>
                                                                <input type="text" defaultValue={std.email} onChange={(e) => setStdEmail(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Mobile</label>
                                                                <input type="text" defaultValue={std.mobile} onChange={(e) => setStdMobile(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>class</label>
                                                                <select className='mt-1' onChange={handleSelectChange}>                            <option value="">Select qualification</option>
                                                                    <option value="I">I</option>
                                                                    <option value="II" >II</option>
                                                                    <option value="III">III</option>
                                                                    <option value="IV" >IV</option>
                                                                    <option value="V">V</option>
                                                                    <option value="VI">VI</option>
                                                                    <option value="VII">VII</option>
                                                                    <option value="VIII" >VIII</option>
                                                                    <option value="IX">IX</option>
                                                                    <option value="X">X</option>
                                                                    <option value="DELED">XI</option>
                                                                    <option value="Ph.D">XII</option>/
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="f1">
                                                            <div className="form_input dfdc">
                                                                <label>Father's Name</label>
                                                                <input type="text" defaultValue={std.fatherName} onChange={(e) => setStdFatherName(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>DOB</label>
                                                                <input type="Date" defaultValue={std.dob} onChange={(e) => setStdDob(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Address</label>
                                                                <input type="text" defaultValue={std.address} onChange={(e) => setStdAddress(e.target.value)} />
                                                            </div>
                                                            <div className="form_input dfdc">
                                                                <label>Gender</label>
                                                                {['radio'].map((type) => (
                                                                    <div className="mb-1">
                                                                        <Form.Check
                                                                            value="Male" onClick={() => setStdGender("Male")}
                                                                            inline label="Male" name="group1" id="male" type={type} />
                                                                        <Form.Check
                                                                            value="Female" onClick={() => setStdGender("Female")}
                                                                            inline label="Female" name="group1" id="female" type={type} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => handleUpdate(std)}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="dfdc jcac std_details">
                                                <h2>{std.username}</h2>
                                                <div className="dfdr jcac std_container">
                                                    <div className="std_photo">
                                                        <img src={student.image} alt="student photo" height="200" />
                                                    </div>
                                                    <div className="std_data">
                                                        <table border={1}>
                                                            <tbody>
                                                                <tr >
                                                                    <td>Gender</td>
                                                                    <td >{student.gender}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td>Class</td>
                                                                    <td >{student.standard}</td>
                                                                </tr>

                                                                <tr >
                                                                    <td >Father's Name</td>
                                                                    <td>{student.fatherName}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >DOB</td>
                                                                    <td>{student.dob}</td>
                                                                </tr>


                                                                <tr >
                                                                    <td >Contact Number</td>
                                                                    <td>{student.mobile}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Email</td>
                                                                    <td>{student.email}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Address</td>
                                                                    <td>{student.address}</td>
                                                                </tr>
                                                                <tr >
                                                                    <td >Admission Date</td>
                                                                    <td>{student.createdAt.slice(0, 10)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        ))
                    }
                </ol>
            </div> : null}

            {/* ----------students for attendence---------- */}
            {studentArray.length > 0 ? <div id="attendance" className="list_view mt-2 mb-3">
                <h5 className="text-center mb-3 text-white bottom_border">Attendance For class:  {studentArray[0].standard}
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setStudentArray([])} style={{ marginLeft: '10vw' }} width="25" height="25" fill="currentColor" className="mb-2 bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </h5>
                <ol className="dfdc jcac">
                    {
                        studentArray.map((s) => (
                            <li key={s._id} className="st_atd">
                                <div className="dfdr justify-content-evenly atd_c">
                                    <div className="dfdr jc">
                                        <img src={s.image} alt="profile" style={{ height: "30px", width: "30px" }} className="br-50 me-2" />
                                        <p>{s.username}</p>
                                    </div>
                                    <div>
                                        {['radio'].map((type) => (
                                            <div className="mb-1 dfdr">
                                                <Form.Check
                                                    value="P" onClick={() => setPresent(s.username, s.email)}
                                                    inline label="Present" name={s._id} id="male" type={type} />
                                                <Form.Check
                                                    value="A" onClick={() => setStdGender("Female")}
                                                    inline label="Absent" defaultChecked name={s._id} id="female" type={type} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>

                        ))
                    }
                    {showButton ? <button className="btn btn-primary" onClick={submitAttendance}>Submit Attendence</button> : null}
                </ol>
            </div> : null}

            {/* present student list */}
            {cwps.length > 0 ? <div className="list_view mt-2 mt-2 mb-2">
                <h3 className="text-white text-center mt-2 mb-4 bottom_border">Present student of class: {ClassOfAttendance}
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setCwps([])} style={{ marginLeft: '10vw' }} width="25" height="25" fill="currentColor" className="mb-2 bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </h3>
                <ol className="dfdc jcac ">
                    {
                        cwps.map((s) => (
                            <li key={s._id} className="st_atd ms-4">
                                <div className="dfdr justify-content-evenly atd_c">
                                    <p>{s.username}</p>
                                    <p>{s.email}</p>
                                </div>
                            </li>

                        ))
                    }
                </ol>
            </div> : null}





        </>
    )
}