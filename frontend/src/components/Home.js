import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Background and Header */}
            <div className="home-header">
                <h1 className="home-title">Welcome to Food Waste Management</h1>
                <p className="home-subtitle">
                    Reducing food waste, feeding the needy, and making a sustainable impact!
                </p>
            </div>

            {/* Banner Section */}
            <div className="banner-container">
                {/* Buy Waste Food Card */}
                <Card className="action-card">
                    <Card.Img
                        variant="top"
                        src="https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg"
                        alt="Buy Waste Food"
                    />
                    <Card.Body>
                        <Card.Title>Buy Waste Food</Card.Title>
                        <Card.Text>
                            Find restaurants offering surplus food at discounted rates.
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/restaurant")}
                        >
                            Explore Restaurants
                        </Button>
                    </Card.Body>
                </Card>

                {/* Donate Food Card */}
                <Card className="action-card">
                    <Card.Img
                        variant="top"
                        src="https://images.pexels.com/photos/9533083/pexels-photo-9533083.jpeg"
                        alt="Donate Food"
                    />
                    <Card.Body>
                        <Card.Title>Donate Food</Card.Title>
                        <Card.Text>
                            Help the community by donating surplus food to those in need.
                        </Card.Text>
                        <Button
                            variant="success"
                            onClick={() => navigate("/donate")}
                        >
                            Donate Now
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home
