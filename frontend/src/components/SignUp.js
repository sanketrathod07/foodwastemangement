import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

function SignUp() {
  const url = `${process.env.REACT_APP_API_URL}/api/users/uploads`;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!user.userName || !user.email || !user.phoneNumber || !user.address || !user.password) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("address", user.address);
    formData.append("password", user.password);

    if (image) {
      formData.append("file", image);
    }

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      toast.success('User Created! Log in to Site')
      navigate("/signIn");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("There was an error! Please try again later.");
      }
      console.error("There was an error!", error);
    }
  };

  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image">
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-3 custom-card" style={{ maxWidth: "700px", width: "100%" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5 custom-heading">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Your Name"
                  size="lg"
                  type="text"
                  placeholder="Enter username"
                  value={user.userName}
                  onChange={handleChange}
                  id="userName"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Your Email"
                  size="lg"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={handleChange}
                  id="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Your Phone Number"
                  size="lg"
                  placeholder="Enter phone number"
                  type="text"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  id="phoneNumber"
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Your Address"
                  size="lg"
                  placeholder="Enter address"
                  type="text"
                  value={user.address}
                  onChange={handleChange}
                  id="address"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Your Password"
                  size="lg"
                  type="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
                  id="password"
                />
                <div className="input-container mb-4">
                  <label htmlFor="file" className="custom-file-upload">
                    <div style={{ display: "flex", gap: "20px", alignItems: 'center' }}>
                      <div className="icon">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          width="58"  // Adjust width as needed
                          height="58"
                        >
                          <path
                            d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          ></path>
                        </svg>
                      </div>
                      <div className="text">
                        <span>Upload Image</span>
                      </div>
                    </div>
                    <input id="file" type="file" onChange={handleImageChange} />
                  </label>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBBtn className="mb-4 w-100 gradient-custom-4 custom-button h-[2.8rem]" type="submit" noRipple>
              Register
            </MDBBtn>
            <div className="text-center">
              <p className="mb-0">
                Already have an account? <Link to="/signIn">Sign in</Link>
              </p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
