import Cookies from 'js-cookie';
import { useController, useForm } from "react-hook-form";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'react-form-validator-core/lib/ValidationRules';


export default function TeacherSignup() {
   let navigate= useNavigate();

    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [address, setAddress] = useState("");
    const [adharno, setAdharno] = useState("");
    const [mobile, setMobile] = useState("");
    const [image, setImage] = useState("");


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
                body: JSON.stringify({ username, fatherName, mobile, gender, address,adharno,password,image})
            })
            newTeacher = await newTeacher.json();
            alert(newTeacher.message)
            if(newTeacher.status==200){
                navigate('/admin/profile')
            }
        }
    }
    return (
        <>
            <div className="form_c mt-3 mb-3 dfdc jcac">
                <div className="form_box dfdc pb-4 jcac">
                    <h2 className="text-white pt-4">Supplier Registration</h2>
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

                              
                                <div className="field dfdc">
                                    <label>Mobile</label>
                                    <input {...register("mobile", { required: true, minLength: 10, maxLength: 13 })} onChange={(e) => setMobile(e.target.value)} />
                                    {errors.mobile && <span className='text-danger'>Invalid Mobile Number </span>}
                                </div>

                                
                            </div>
                            <div className="part1 dfdc">
                            <div className="field dfdc">
                                    <label>Address</label>
                                    <input {...register("address", { required: true, minLength: 5 })} onChange={(e) => setAddress(e.target.value)} />
                                    {errors.address && <span className='text-danger'>Address required</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Adhar Number</label>
                                    <input {...register("subject", { required: true, minLength: 12 })} onChange={(e) => setAdharno(e.target.value)} />
                                    {errors.subject && <span className='text-danger'>Please correct adhar number</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Password</label>
                                    <input {...register("password", { required: true, minLength: 3 })} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <span className='text-danger'>Password should be atleast 3 character</span>}
                                </div>

                                <div className="field dfdc">
                                    <label>Profile Photo</label>
                                    <input type='file' accept='image/*' {...register("image", { required: true, })} onChange={convertToBase64} />
                                    {errors.image && <span className='text-danger'>Image required</span>}
                                </div>

                               
                            </div>
                        </div>
                       {errors &&  <input type="submit" onClick={handleRegistration} value="Submit Form" className="btn btn-primary" />}
                    </form>
                </div>
            </div>
        </>
    )
}