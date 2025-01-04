import React, { useState, useEffect } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import FoodCardItem from "./FoodCardItem";
import axios from "axios";
import "@picocss/pico";
import { getUserRole } from "./UserRole";
import Loader from "./Loader/Loader";

export default function ListOfRestaurants({ handleAddToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = getUserRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching all restaurants
        const restaurantResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants`);
        setRestaurants(restaurantResponse.data.restaurants);

        // Fetching all products
        const productResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(productResponse.data.products);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-of-restaurants">
      <div className="content">
        <h1>Welcome to the Donation Explorer</h1>

        {/* Render all Products */}
        <section className="product-list">
          <h2>Donate Products</h2>
          {products.length > 0 ? (
            <div className="card-grid">
              {products.reverse().map((foodItem) => (
                <FoodCardItem key={foodItem._id} foodItem={foodItem} handleAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </section>

        {/* Render all Restaurants */}
        <section className="restaurant-list">
          <h2>Explore Local Restaurants</h2>
          {restaurants.length > 0 ? (
            <div className="card-grid">
              {restaurants.map((restaurant) => (
                <RestaurantCardItem key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <p>No restaurants available</p>
          )}
        </section>
      </div>
    </div>
  );
}
