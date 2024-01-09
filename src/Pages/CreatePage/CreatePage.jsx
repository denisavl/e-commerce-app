/* eslint-disable react/prop-types */

import styles from "../CreatePage/createPage.module.css";
import Header from "../../components/Header/Header";
import { useState } from "react";

export default function CreatePage({ title, products, brands, classifications, colors, prices, properties }) {

  const [activeFilter, setActiveFilter] = useState(null);

  function toggleActive(filter) {
    setActiveFilter(activeFilter === filter ? null : filter);
  }

  return (
    <div>
      <Header />
      <div className={styles.pageContainer}>
        <h1 className={styles.titlePage}>{title} products {`(${products.length})`}</h1>
        <div className={styles.filtersContainer}>
        <div className={styles.filterBox} onClick={() => toggleActive('brands')}>
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
            {activeFilter === 'brands' && (
              <ul className={styles.filterOptions}>
                {brands.map((brand, index) => (
                  <li key={index}>{brand}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.filterBox} onClick={() => toggleActive('classification')}>
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
            {activeFilter === 'classification' && (
              <ul className={styles.filterOptions}>
                {classifications.map((classification, index) => (
                  <li key={index}>{classification}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.filterBox} onClick={() => toggleActive('color')}>
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
            {activeFilter === 'color' && 
            <ul className={styles.filterOptions}>
                {colors.map((color, index) => (
                  <li key={index}>{color}</li>
                ))}
            </ul>
            }
          </div>
          <div className={styles.filterBox} onClick={() => toggleActive('price')}>
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
            {activeFilter === 'price' && 
            <ul className={styles.filterOptions}>
                {prices.map((price, index) => (
                  <li key={index}>{price}</li>
                ))}
            </ul>
            }
          </div>
          <div className={styles.filterBox} onClick={() => toggleActive('property')}>
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
            {activeFilter === 'property' && 
            <ul className={styles.filterOptions}>
                {properties.map((property, index) => (
                  <li key={index}>{property}</li>
                ))}
            </ul>
            }
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
              <div className={styles.brand}>{product.brand }</div>
              <div className={styles.nameContainer}>
              <span>{product.name}</span>
              <span className={styles.productType}>{product.product_type}</span>
              </div>
              <p>${(product.price && product.price > 0) ? `${product.price}` : `${product.price = '15.0'}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
