import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-bar">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search for a restaurant..."
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
        />
        <Button variant="primary" type="submit" className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
