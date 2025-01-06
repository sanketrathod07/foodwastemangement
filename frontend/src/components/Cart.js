import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Cart.css"; // Import custom CSS for additional styling

const Cart = ({ selectedItems, handleIncrement, handleDecrement }) => {
  const getTotal = () => {
    let total = 0;
    selectedItems.forEach((product) => {
      total += product.price * product.qte;
    });
    return Math.round(total * 100) / 100;
  };

  const navigate = useNavigate();

  const NavigateCheckout = () => {
    if (selectedItems.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {selectedItems.length > 0 ? (
        <Card className="cart-card">
          <Card.Body>
            <ListGroup variant="flush">
              {selectedItems.map((item) => (
                <ListGroup.Item key={item._id} className="cart-item">
                  <div className="cart-item-details">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h5 className="cart-item-name">{item.name}</h5>
                      <p className="cart-item-price">
                        Unit Price: <strong>₹{item.price}</strong>
                      </p>
                      <p className="cart-item-total">
                        Total: <strong>₹{item.price * item.qte}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDecrement(item._id)}
                    >
                      -
                    </Button>
                    <span className="cart-item-quantity">{item.qte}</span>
                    <Button
                      variant="outline-success"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="cart-summary">
              <h5 style={{ color: "black" }}>Total Price: ₹{getTotal()}</h5>
              <Button
                variant="primary"
                onClick={NavigateCheckout}
                disabled={selectedItems.length === 0}
                className="checkout-button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="empty-cart">
          <img
            src="https://res.cloudinary.com/dq8b6vgab/image/upload/v1736000038/11329060_xfmmjg.png"
            alt="Empty Cart"
            className="empty-cart-image"
          />
          <h5 className="empty-cart-text">Your cart is empty. Buy Food!</h5>
        </div>
      )}
    </div>
  );
};

export default Cart;
