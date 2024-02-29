/* eslint-disable react/prop-types */
import styles from "../SearchBar/searchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setResults, setIsLoading, }) {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState();

  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchSearch = async (value) => {
    try {
      const response = await fetch(
        `https://makeup-api.herokuapp.com/api/v1/products.json?`
      );
      const data = await response.json();

      const results = data.filter((product) => {
        const brandMatch =
          product.brand && product.brand.toLowerCase().includes(value);
        const productTypeMatch =
          product.product_type &&
          product.product_type.toLowerCase().includes(value);
        const nameMatch =
          product.name && product.name.toLowerCase().includes(value);
        return brandMatch || productTypeMatch || nameMatch;
      });
      setData(results);
      setResults(results);
      return results;
    } catch (error) {
      console.error("Error fetching search data:", error);
      return [];
    }
  };

  const handleInputChange = debounce((value) => {
    setSearchItem(value);
    fetchSearch(value);
  }, 100);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsLoading(true);
      await fetchSearch(searchItem);
      setIsLoading(false);
      navigate("/search");
    }
  };

  return (
    <div>
      <form className={styles.formContainer}>
        <img
          className={styles.searchIcon}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E"
          alt=""
        />
        <input
          type="text"
          name="search-bar"
          className={styles.searchBar}
          placeholder="Search"
          value={searchItem}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
      <div className={styles.dropDown}>
        {data?.slice(0, 8).map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
