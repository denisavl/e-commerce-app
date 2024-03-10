/* eslint-disable react/prop-types */
import styles from "../SearchBar/searchBar.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchBar({ setResults, setIsLoading, searchItem, setSearchItem }) {
  const [filteredData, setFilteredData] = useState([]);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSearch = async (value) => {
      try {
        setLoadingPreview(true);
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

        setResults(results);
        setFilteredData(results);
        setShowPreview(results.length > 0);
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setLoadingPreview(false);
      }
    };

    if (searchItem) {
      const debounceTimeout = setTimeout(() => {
        fetchSearch(searchItem);
      }, 300);

      return () => clearTimeout(debounceTimeout);
    } else {
      setShowPreview(false);
    }

    return undefined;
  }, [searchItem, setResults]);

  useEffect(() => {
    const handleLocationChange = () => {
      setSearchItem("");
    };

    return () => {
      handleLocationChange();
    };
  }, [setSearchItem]);

  const handleInputChange = (value) => {
    setSearchItem(value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsLoading(true);
      navigate("/search");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    if (filteredData.length > 0) {
      setShowPreview(true);
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
          ref={inputRef}
          onClick={handleInputClick}
        />
        {loadingPreview && <span className={styles.loader}></span>}
      </form>

      {showPreview && (
        <div className={styles.dropDown}>
          <div className={styles.productsTitle}>Products</div>
          {filteredData.slice(0, 6).map((item) => (
            <div key={item.id} >
              <Link
                to={`/search/${item.id}`}
              >
                <div className={styles.productContainer}>
                  <img
                    className={styles.productImg}
                    src={item.api_featured_image}
                    alt={item.name}
                  />
                  <div className={styles.descriptionProduct}>
                    <div className={styles.brand}>{item.brand}</div>
                    <div>{item.name}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
