import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Show from "./Show";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const FoodCardItem = ({ foodItem, handleAddToCart }) => {

  const stars = [...Array(5)].map((_, i) => (
    <span
      key={i}
      style={{
        color: foodItem?.rating > i ? "#FFC107" : "#E0E0E0",
        fontSize: "18px",
        margin: "0 2px",
      }}
    >
      ★
    </span>
  ));

  return (
    <Card
      style={{
        width: "18rem",
        marginTop: "40px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      className="food-card"
    >
      <Card.Img
        variant="top"
        src={foodItem?.image || "placeholder.jpg"}
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: '0px',
        }}
      >
        <Card.Title
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          {foodItem?.name}
        </Card.Title>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <Card.Text
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#4CAF50",
              marginBottom: "10px",
            }}
          >
            Price: {foodItem?.price} $
          </Card.Text>
          <div style={{ marginBottom: "10px" }}>{stars}</div>
        </div>
        <Show
          content={foodItem?.description || "No description available"}
          maxLength={60}
        />
        <Button
          variant="success"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: 'center',
          }}
          onClick={() => handleAddToCart(foodItem)}
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "10px" }} />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodCardItem;
