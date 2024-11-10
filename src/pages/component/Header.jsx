
import { Link, Outlet } from "react-router-dom";
import './header.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header() {

  const [cookie, setCookie] = useState();
  let c = document.cookie;
  useEffect(() => {
    if (c.slice(0, 5) == "admin") {
      setCookie(c.slice(0, 5));
    } else if (c.slice(0, 8) == "supplier") {
      setCookie(c.slice(0, 8));
    } else if (c.slice(0, 8) == "customer") {
      setCookie(c.slice(0, 8));
    }
    console.log(cookie)
  })
 const hide=()=>{
  document.getElementById("navb").style.visibility='hidden !important';
 }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand}  className="bg-dark navbar">
          {/* <div className="moving"><img src="/static/moving.png" width="50" /></div> */}
          <Container fluid>
            <div className="dfdr ac justify-content-between nav_link">
              <Navbar.Brand href="#" className="p-0">
                <div className="dfdr jcac">
                  <img src="/static/logo.png" alt="" height="60" className="br-50" style={{zIndex:"100"}} />
                  <h5 className="text-white ms-3" style={{zIndex:"100"}}>Waterken</h5>
                </div>
              </Navbar.Brand>
              <div className="dfdr ac" style={{zIndex:"100"}}>
              <Link to="" className="text-white nav-links hd ms-3 me-3">Home</Link>
              <Link to="" className="text-white nav-links hd ms-3 me-3">Branches</Link>
              <Link to="" className="text-white nav-links hd ms-3 me-3">Services</Link>
                <Link to="" className="text-white nav-links hd ms-3 me-3">About</Link>
                <Link to="" className="text-white nav-links hd ms-3 me-3">Contact</Link>
                <Link to="" className="text-white nav-links hd ms-3 me-3">Term & Condition</Link>
                {/* ----log in button */}
                <DropdownButton id="dropdown-basic-button" style={{zIndex:"1000"}} title="Log in" className="hd login_btn me-3">
                  <Dropdown.Item >
                    {cookie === 'admin' ? <Link to="/admin/profile" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>Dashboard</Link> : <Link to="/admin/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-bounding-box" viewBox="0 0 16 16">
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    </svg>Admin</Link>}
                  </Dropdown.Item>
                  <Dropdown.Item >
                    {cookie == 'supplier' ? <Link to="/supplier/profile" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>Dashboard</Link> : <Link to="/supplier/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>Supplier</Link>}

                  </Dropdown.Item>
                  <Dropdown.Item >
                    {cookie == 'customer' ? <Link to="/customer/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>Profile</Link> : <Link to="/customer/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-people-fill" viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>Customer</Link>}
                  </Dropdown.Item>
                </DropdownButton>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='bg-light menu' />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand} navb`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton className="bg-success pb-2">
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Hello User
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link to="/" onClick ={hide}>Home</Nav.Link>
                      <Nav.Link href="#action2" onClick ={hide}>Branches</Nav.Link>
                      <Nav.Link href="#action2">Services</Nav.Link>
                      <Nav.Link href="#action2">About</Nav.Link>
                      <Nav.Link href="#action2">Contact</Nav.Link>
                      <Nav.Link href="#action2">Term & Condition</Nav.Link>
                      <DropdownButton id="dropdown-basic-button" title="Log in" className="login_btn me-3">
                        <Dropdown.Item >
                          {cookie == 'admin' ? <Link to="/admin/profile" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                          </svg>Dashboard</Link> : <Link to="/admin/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-bounding-box" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          </svg>Admin</Link>}
                        </Dropdown.Item>
                        <Dropdown.Item >
                          {cookie == 'supplier' ? <Link to="/supplier/profile" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                          </svg>Dashboard</Link> : <Link to="/supplier/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                          </svg>Supplier</Link>}

                        </Dropdown.Item>
                        <Dropdown.Item >
                          {cookie == 'customer' ? <Link to="/customer/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-person-fill-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                          </svg>Profile</Link> : <Link to="/customer/login" className="fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2 bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                          </svg>Customer</Link>}
                        </Dropdown.Item>
                      </DropdownButton>
                    </Nav>

                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </div>
            </div>
          </Container>
        </Navbar>
      ))}
      <Outlet />
    </>
  );
}

