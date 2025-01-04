import React, { useState, useEffect } from "react";
import FoodCardItem from "./FoodCardItem";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader/Loader";

const ListOfFoodItems = ({ handleAddToCart }) => {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all restaurants
        const response = await axios.get(`http://localhost:8022/api/restaurants`);
        const restaurants = response.data.restaurants;

        // Find the restaurant with the matching ID
        const restaurant = restaurants.find(restaurant => restaurant._id === id);
        if (restaurant) {
          setSelectedRestaurant(restaurant);
          setFilteredFoodItems(restaurant.products);
        } else {
          setError("Restaurant not found");
        }



      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = (query) => {
    if (selectedRestaurant && selectedRestaurant.products) {
      const filtered = selectedRestaurant.products.filter((foodItem) =>
        foodItem.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoodItems(filtered);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredFoodItems.map((foodItem) => (
          <FoodCardItem
            key={foodItem._id}
            foodItem={foodItem}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfFoodItems;