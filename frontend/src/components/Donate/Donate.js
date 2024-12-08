import React, { useState } from 'react';
import "./Donate.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Donate({ restaurants }) {
    const [formData, setFormData] = useState({
        restaurantId: "",
        name: "",
        description: "",
        address: "",
        price: 728,
        rating: 0,
        qte: 10,
        image: null,
        availability: true,
    });

    // console.log("formData0", formData);

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    // const onSubmitDonate = async () => {

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationData = {
            restaurantId: formData.restaurantId,
            name: formData.name,
            description: formData.description,
            address: formData.address,
            rating: formData.rating,
            price: formData.price,
            qte: formData.qte,
            availability: formData.availability,
            qte: formData.qte,
            image: formData.image ? formData.image : "",
        };
        console.log("donationData", donationData)
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            // // Prepare FormData for file upload
            // const data = new FormData();
            // data.append("restaurantId", formData.restaurantId);
            // data.append("name", formData.name);
            // data.append("description", formData.description);
            // data.append("address", formData.address);
            // data.append("rating", formData.rating);
            // data.append("price", formData.price);
            // data.append("qte", formData.qte);
            // data.append("availability", formData.availability);
            // console.log("Data", data)
            // if (formData.image) {
            //     data.append("image", formData.image);
            // }

            await axios.post("http://localhost:8022/api/products", donationData, {
                headers: { Authorization: 'Bearer ' + token, },
            });

            alert("Product added to the restaurant successfully!");
            setFormData({
                restaurantId: "",
                name: "",
                description: "",
                address: "",
                price: 0,
                rating: 0,
                qte: 0,
                image: null,
                availability: true,
            });
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
            <p className="donate-subtitle">Fill in the details below to donate food from your restaurant.</p>

            <Form className="donate-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Select Restaurant</Form.Label>
                    <Form.Control
                        as="select"
                        name="restaurantId"
                        value={formData.restaurantId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a restaurant</option>
                        {restaurants.map((restaurant) => (
                            <option key={restaurant._id} value={restaurant._id}>
                                {restaurant.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name" // Changed from "foundingDate" to "name"
                        placeholder='Enter Food Name'
                        value={formData.name}
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
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
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
                    <Form.Label>Logo</Form.Label>
                    <Form.Control
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
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
