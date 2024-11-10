import Cookies from 'js-cookie';
import { useController, useForm } from "react-hook-form";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'react-form-validator-core/lib/ValidationRules';


export default function TeacherSignup() {
   let navigate= useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [address, setAddress] = useState("");
    const [subject, setSubject] = useState("");
    const [mobile, setMobile] = useState("");
    const [salary, setSalary] = useState("");
    const [qualification, setQualification] = useState("");
    const [image, setImage] = useState("");
    const[cookie,setCookie]=useState("");


    const convertToBase64 = (e) => {
        var render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        render.onload = () => {
            setImage(render.result);
        };
        render.error = () => {
            console.log(render.error);
        }
    }


    const handleSelectChange = (event) => {
        setQualification(event.target.value);
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handleRegistration = async () => {
        if (Cookies.get('Director')) {
            let newTeacher = await fetch('https://watrken-wb.onrender.com/director/addteacher', {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ username, fatherName, email, mobile, gender, qualification, subject, salary, address,image, password,cookie })
            })
            newTeacher = await newTeacher.json();
            alert(newTeacher.message)
            if(newTeacher.status==200){
                navigate('/director/profile')
            }
        }
    }
    return (
        <>
            <div className="form_c mt-3 mb-3 dfdc jcac">
                <div className="form_box dfdc pb-4 jcac">
                    <h2 className="text-white pt-4">Teacher Registration</h2>
                    <form onSubmit={handleSubmit()} className="input_c dfdc">
                        <div className="form_r">
                            <div className="part1 dfdc">
                                <div className="field dfdc">
                                    <label> Name</label>
                                    <input placeholder="name" {...register("example", { required: true, minLength: 3 })} onChange={(e) => setUsername(e.target.value)} />
                                    {errors.example && <span className='text-danger'>Name required</span>}
                                </div>

                                <div className='field dfdc'>
                                    <label htmlFor="">Gender</label>
                                    {['radio'].map((type) => (
                                        <div className="mb-1">
                                            <Form.Check
                                                value="Male" onClick={() => setGender("Male")}
                                                inline label="Male" name="group1" id="male" type={type} />
                                            <Form.Check
                                                value="Female" onClick={() => setGender("Female")}
                                                inline label="Female" name="group1" id="female" type={type} />
                                        </div>
                                    ))}
                                </div>
                                <div className="field dfdc">
                                    <label>Father's Name</label>
                                    <input {...register("exampleRequired", { required: true })} onChange={(e) => setFatherName(e.target.value)} />
                                    {errors.exampleRequired && <span className='text-danger'>Father's name required</span>}
                                </div>

                                <div className="field dfdc ">
                                    <label>Email</label>
                                    <input {...register("email", { required: true, minLength: 5, type: isEmail, })} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <span className='text-danger'>Invalid Email</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Mobile</label>
                                    <input {...register("mobile", { required: true, minLength: 10, maxLength: 13 })} onChange={(e) => setMobile(e.target.value)} />
                                    {errors.mobile && <span className='text-danger'>Invalid Mobile Number </span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Address</label>
                                    <input {...register("address", { required: true, minLength: 5 })} onChange={(e) => setAddress(e.target.value)} />
                                    {errors.address && <span className='text-danger'>Address required</span>}
                                </div>
                            </div>
                            <div className="part1 dfdc">
                                <div className="field dfdc">
                                    <label htmlFor="qualification">Qualification</label>
                                    <select className='mt-1' value={qualification} onChange={handleSelectChange}>                            <option value="">Select qualification</option>
                                        <option value="Matric">Matric</option>
                                        <option value="Intermediate" >Intermediate</option>
                                        <option value="B.A">B.A</option>
                                        <option value="B.Sc" >B.Sc</option>
                                        <option value="B.com">B.com</option>
                                        <option value="BCA">BCA</option>
                                        <option value="Polytechnic">Polytechnic</option>
                                        <option value="ITI" >ITI</option>
                                        <option value="B.Tech">B.Tech</option>
                                        <option value="B.ed">B.ed</option>
                                        <option value="DELED">DELED</option>
                                        <option value="Ph.D">Ph.D</option>/
                                    </select>
                                </div>
                                <div className="field dfdc">
                                    <label>Salary</label>
                                    <input {...register("salary", { required: true, minLength: 3, })} onChange={(e) => setSalary(e.target.value)} />
                                    {errors.salary && <span className='text-danger'>Salary required</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Subject</label>
                                    <input {...register("subject", { required: true, minLength: 3 })} onChange={(e) => setSubject(e.target.value)} />
                                    {errors.subject && <span className='text-danger'>At least one or more subject required</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Profile Photo</label>
                                    <input type='file' accept='image/*' {...register("image", { required: true, })} onChange={convertToBase64} />
                                    {errors.image && <span className='text-danger'>Image required</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Password</label>
                                    <input {...register("password", { required: true, minLength: 3 })} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <span className='text-danger'>Password should be atleast 3 character</span>}
                                </div>
                            </div>
                        </div>
                        <input type="submit" onClick={handleRegistration} value="Submit Form" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </>
    )
}