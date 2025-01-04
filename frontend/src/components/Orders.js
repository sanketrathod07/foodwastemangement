import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader/Loader";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Orders</h3>

      {!isLoading && orders.length === 0 && (
        <div style={styles.noOrders}>No orders yet.</div>
      )}

      {!isLoading && orders.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ color: 'black', fontWeight: '700' }}>Order ID</th>
              <th style={{ color: 'black', fontWeight: '700' }}>Order Date</th>
              <th style={{ color: 'black', fontWeight: '700' }}>Total Price</th>
              <th style={{ color: 'black', fontWeight: '700' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ color: 'black' }}>{order._id}</td>
                <td style={{ color: 'black' }}>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td style={{ color: 'black' }}>{order.totalPrice}</td>
                <td style={styles.status}>Confirmed</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    color: "#333",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  noOrders: {
    textAlign: "center",
    color: "#666",
    fontSize: "1rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  status: {
    color: "green",
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#f8f8f8",
    borderBottom: "2px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
};
