import React, { useState, useEffect } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";
import axios from "axios";
import "@picocss/pico";
import { getUserRole } from "./UserRole";

export default function ListOfRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const role = getUserRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8022/api/restaurants");
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (locationFilter === "" || restaurant.location === locationFilter) &&
          restaurant.rating >= minRatingFilter
      )
    );
  }, [restaurants, searchTerm, locationFilter, minRatingFilter]);

  useEffect(() => {
    const locations = restaurants.map((restaurant) => restaurant.location);
    const uniqueLocations = Array.from(new Set(locations));
    setUniqueLocations(uniqueLocations);
  }, [restaurants]);

  return (
    <div className="list-of-restaurants">
      <div className="filters">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        <select
          className="filter-dropdown"
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          className="filter-dropdown"
          onChange={(e) => setMinRatingFilter(parseFloat(e.target.value))}
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Stars
            </option>
          ))}
        </select>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCardItem key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants match the filters</p>
        )}
      </div>
    </div>
  );
}
