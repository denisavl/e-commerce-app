/* eslint-disable react/prop-types */

import styles from "../CreatePage/createPage.module.css";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";

export default function CreatePage({
  title,
  products,
  brands,
  classifications,
  colors,
  prices,
  properties,
  handleFilter
}) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const [checkedClassification, setCheckedClassification] = useState([]);
  const [checkedColor, setCheckedColor] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);
  const [checkedProperty, setCheckedProperty] = useState([]);

  function handleCheckChange(prevChecked, value, filter) {

    const currentIndex = prevChecked.indexOf(value);
    const newChecked = [...prevChecked];
    if(currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    switch (filter){
      case 'brand' :
      setCheckedBrand(newChecked);
      break;
      case 'classification':
      setCheckedClassification(newChecked)
      break;
      case 'color' :
      setCheckedColor(newChecked);
      break;
      case 'price' :
      setCheckedPrice(newChecked);
      break;
      case 'property' :
      setCheckedProperty(newChecked);
      break;
  }
    handleFilter(newChecked, filter);
  }

  function toggleActive(filter) {
    setActiveFilter(activeFilter === filter ? null : filter);
  }

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveFilter(null);
    };

    window.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);


  return (
    <div>
      <Header />
      <div className={styles.pageContainer}>
        <h1 className={styles.titlePage}>
          {title} products {`(${products.length})`}
        </h1>
        <div className={styles.filtersContainer}>
          <div
            className={styles.filterBox}
            onClick={(event) => {
              event.stopPropagation();
              toggleActive("brand");
            }}
          >
            <button type="button">Brands</button>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L9.5 13L1 6" stroke="black"></path>
              </svg>
            </span>
            {activeFilter === "brand" && (
              <ul className={styles.filterOptions} onClick={(event) => event.stopPropagation()}> 
                {brands.map((brand, index) => (
                  <li key={index}>
                    <Checkbox 
                    label={brand}
                    checked={checkedBrand.indexOf(brand) === -1 ? false : true}
                    onChange={() => handleCheckChange(checkedBrand, brand, 'brand')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className={styles.filterBox}
            onClick={(event) => {
              event.stopPropagation();
              toggleActive("classification");
            }}
          >
            <button type="button">Classification</button>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L9.5 13L1 6" stroke="black"></path>
              </svg>
            </span>
            {activeFilter === "classification" && (
              <ul className={styles.filterOptions} onClick={(event) => event.stopPropagation()}>
                {classifications.map((classification, index) => (
                  <li key={index}>
                    <Checkbox 
                    label={classification}
                    checked={checkedClassification.indexOf(classification) === -1 ? false : true}
                    onChange={() => handleCheckChange(checkedClassification, classification, 'classification')}
                  />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className={styles.filterBox}
            onClick={(event) => {
              event.stopPropagation();
              toggleActive("color");
            }}
          >
            <button type="button">Color</button>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L9.5 13L1 6" stroke="black"></path>
              </svg>
            </span>
            {activeFilter === "color" && (
              <ul className={styles.filterOptions} onClick={(event) => event.stopPropagation()}>
                {colors.map((color, index) => (
                  <li key={index}>
                    <Checkbox 
                    label={color}
                    checked={checkedColor.indexOf(color) === -1 ? false : true}
                    onChange={() => handleCheckChange(checkedColor, color, 'color')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className={styles.filterBox}
            onClick={(event) => {
              event.stopPropagation();
              toggleActive("price");
            }}
          >
            <button type="button">Price</button>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L9.5 13L1 6" stroke="black"></path>
              </svg>
            </span>
            {activeFilter === "price" && (
              <ul className={styles.filterOptions} onClick={(event) => event.stopPropagation()}>
                {prices.map((price, index) => (
                  <li key={index}>
                    <Checkbox 
                    label={price}
                    checked={checkedPrice.indexOf(price) === -1 ? false : true}
                    onChange={() => handleCheckChange(checkedPrice, price, 'price')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className={styles.filterBox}
            onClick={(event) => {
              event.stopPropagation();
              toggleActive("property");
            }}
          >
            <button type="button">Property</button>
            <span>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L9.5 13L1 6" stroke="black"></path>
              </svg>
            </span>
            {activeFilter === "property" && (
              <ul className={styles.filterOptions} onClick={(event) => event.stopPropagation()}>
                {properties.map((property, index) => (
                  <li key={index}>
                   <Checkbox 
                   label={property}
                   checked={checkedProperty.indexOf(property) === -1 ? false : true} 
                  onChange={() => handleCheckChange(checkedProperty, property, 'property')}
                   />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.sortContainer}>
          <span>Sort by:</span>
          <select name="sort" id="sort">
            <option value="popularity">Popularity</option>
            <option value="low">Price low to high</option>
            <option value="big">Price high to low</option>
            <option value="latest">Latest</option>
          </select>
        </div>
        <div className={styles.productsContainer}>
          {products.map((product, index) => (
            <div key={index} className={styles.productBox}>
              <img
                className={styles.productImg}
                src={product.api_featured_image}
                alt={product.name}
              />
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.nameContainer}>
                <span>{product.name}</span>
                <span className={styles.productType}>
                  {product.product_type}
                </span>
              </div>
              <p>
                $
                {product.price && product.price > 0
                  ? `${product.price}`
                  : `${(product.price = "15.0")}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Checkbox = ({label, checked, onChange}) => {
  return(
    <label className={styles.checkBox}>
    <input type="checkbox" checked={checked} onChange={onChange}/>
        {label}
      </label>
  )

}