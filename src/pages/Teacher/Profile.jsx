import { useState,useEffect } from "react"
export default function Profile(){
 const [supplier,setSupplier]=useState('')

useEffect(()=>{
  loaddata();
},[])

const  loaddata=async()=>{
 let result= await fetch('https://watrken-wb.onrender.com/teacher/loaddata',{
    method:'GET',
    headers:{'Content-Type':'application/json'}
 });
 result= await result.json();
 setSupplier(result);
 console.log(result)
}
const logout = () => {
    Cookies.remove('Director');
    navigate('/');
}
    return(
        <>
         <div className="df dfdr">
                <img src={supplier.image} alt="Profile" className="director-img" />
                <div className="dfdc jcac" style={{ flexBasis: "60%" }}>
                    <h3><b>{supplier.username}</b></h3>
                    <h6>Role: Supplier</h6>
                </div>

                <button className="btn btn-primary logout_btn" onClick={logout}>Log out</button>
            </div>
        </>
    )
}