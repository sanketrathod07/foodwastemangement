import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Checkout.css'

function Checkout({ selectedItems, clearCart }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const getTotal = () => {
    return selectedItems.reduce((total, product) => total + product.price * product.qte, 0).toFixed(2);
  };

  const onSubmitOrder = async () => {
    try {
      setIsLoading(true);
      const total = getTotal();
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          products: selectedItems.map((product) => product._id),
          totalPrice: total,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      clearCart();
      navigate("/orders");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer className="checkout-container">
      <div className="header">
        <a href="/" className="return-link">
          Cancel and return to the website
        </a>
      </div>
      <MDBRow style={{ width: '100%' }}>
        <MDBCol md="7" lg="7" xl="8">
          <div className="order-summary">
            <h5 className="total-price">Total Price: ${getTotal()}</h5>
            <hr />
            <h5 className="thank-you">Thank you for using EcoEats!</h5>
            <hr />
            <div className="payment-section">
              <h6>Add Payment Card</h6>
              <MDBBtnGroup vertical className="payment-options">
                <input
                  type="radio"
                  className="btn-check"
                  name="paymentOptions"
                  id="visa"
                  autoComplete="off"
                />
                <label htmlFor="visa" className="btn btn-outline-primary payment-label">
                  <span>VISA</span>
                  <span>**** 5436</span>
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="paymentOptions"
                  id="mastercard"
                  autoComplete="off"
                  defaultChecked
                />
                <label htmlFor="mastercard" className="btn btn-outline-primary payment-label">
                  <span>MASTER CARD</span>
                  <span>**** 5038</span>
                </label>
              </MDBBtnGroup>
              {!!selectedItems?.length && (
                <MDBBtn
                  className="submit-btn"
                  color="success"
                  size="lg"
                  onClick={onSubmitOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Submit Order"}
                </MDBBtn>
              )}
            </div>
          </div>
        </MDBCol>
        <MDBCol md="5" lg="4" xl="4">
          <div className="recap-section">
            <h6 className="recap-title">Order Recap</h6>
            {selectedItems.map((item) => (
              <div key={item._id} className="recap-item">
                <span className="recap-itemName">{item.name}</span>
                <span>{item.qte}</span>
                <span>${(item.price * item.qte).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="recap-total">
              <span>Total</span>
              <span className="total-amount">${getTotal()}</span>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Checkout;
