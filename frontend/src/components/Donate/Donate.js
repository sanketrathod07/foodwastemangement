import React, { useState } from 'react';
import "./Donate.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // Importing Spinner component for loading indicator
import { useNavigate } from 'react-router-dom';


export default function Donate() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        rating: 0,
        qte: 1,
        image: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileUpload = async (e) => {
        setIsUploadingImage(true);
        const fileData = new FormData();
        fileData.append("file", e.target.files[0]);
        fileData.append("upload_preset", "foodwaste");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dq8b6vgab/image/upload",
                fileData
            );
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: response.data.secure_url,
            }));
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploadingImage(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationData = {
            name: formData.name,
            description: formData.description,
            rating: formData.rating,
            price: formData.price,
            quantity: formData.qte,
            image: formData.image,
        };


        try {
            setIsLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/products`,
                donationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product added successfully!");

            // Reset the form
            setFormData({
                name: "",
                description: "",
                price: 0,
                rating: 0,
                qte: 1,
                image: "",
            });

            navigate("/restaurant");
        } catch (error) {
            console.error("Error while adding product:", error);
            alert("Failed to add product. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div className="donate-container">
            <h2 className="donate-title">Donate Food</h2>
            <p className="donate-subtitle">Fill in the details below to donate food.</p>

            <Form className="donate-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Food Name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Enter a brief description"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Enter rating (1-5)"
                        min="1"
                        max="5"
                        step="0.1"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="qte"
                        value={formData.qte}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                        accept="image/*"
                        required
                    />
                    {isUploadingImage && (
                        <div className="uploading-status">
                            <Spinner animation="border" size="sm" />
                            <span>Uploading...</span>
                        </div>
                    )}
                </Form.Group>

                <div className="donate-button">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
