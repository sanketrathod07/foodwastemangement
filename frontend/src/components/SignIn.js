import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, } from "mdb-react-ui-kit";
import "../App.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

function SignIn() {
    const url = `${process.env.REACT_APP_API_URL}/api/signIn`;
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };
    // test commit 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url, user)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                if (response.data.user.role === 'user') { navigate('/'); }
                else { navigate('/users') }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        toast.success('Welcome to Food Waste Management!')
    };

    return (
        <div style={{ width: '100%', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image" >
                <div className="mask gradient-custom-3"></div>
                <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                    <MDBCardBody className="px-5">
                        <h2 className="text-uppercase text-center mb-5">Sign In to your account</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Email"
                                size="lg"
                                placeholder="Enter email"
                                onChange={handleChange}
                                id="email"
                                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Password"
                                size="lg"
                                type="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                id="password"
                            />
                            <MDBBtn
                                style={{
                                    minHeight: '2.8rem', // Use minHeight to prevent expansion
                                    padding: '0.8rem', // Adjust padding as needed
                                    transition: 'none', // Remove transition if any
                                }}
                                className="mb-4 w-100 gradient-custom-4 h-[2.8rem]" size="lg" type="submit" noRipple> Sign In </MDBBtn>
                            <div className="text-center">
                                <p className="mb-0">Forgot your password?</p>
                                <Link to="/resetPassword">Reset Password</Link> or <Link to="/signup">SignUp Here</Link>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}
export default SignIn;