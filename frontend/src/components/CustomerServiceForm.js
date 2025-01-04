import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import "./CustomerServiceForm.css"; // Import the CSS file for styling

function CustomerServiceForm() {
    const url = `${process.env.REACT_APP_API_URL}/api/customerservices`; // Update the API endpoint for customer service
    const [customerInquiry, setCustomerInquiry] = useState({ name: "", email: "", inquiry: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCustomerInquiry({ ...customerInquiry, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(url, customerInquiry)
            .then((response) => {
                alert("Request submitted! We will get back to you as soon as possible.");
                navigate("/");
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    return (
        <div className="customer-service-form">
            <MDBContainer fluid className="d-flex align-items-center justify-content-center">
                <MDBCard className="form-card">
                    <MDBCardBody className="form-card-body">
                        <h2 className="form-title text-center">Customer Service Inquiry</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                label="Your Name"
                                wrapperClass="mb-4"
                                size="lg"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                id="name"
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Email"
                                size="lg"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                id="email"
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Your Inquiry"
                                size="lg"
                                type="textarea"
                                placeholder="Enter your inquiry"
                                onChange={handleChange}
                                id="inquiry"
                            />
                            <MDBBtn className="submit-btn w-100" size="lg" type="submit">
                                Submit Inquiry
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default CustomerServiceForm;
