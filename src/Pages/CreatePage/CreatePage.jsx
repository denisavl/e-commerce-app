/* eslint-disable react/prop-types */

import styles from "../CreatePage/createPage.module.css";
import Header from "../../components/Header/Header";

export default function CreatePage({ title, products }) {
  return (
    <div>
      <Header />
      <div className={styles.pageContainer}>
        <h1>{title} products</h1>
        <div className={styles.filtersContainer}>
          <div className={styles.filterBox}>
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
          </div>
          <div className={styles.filterBox}>
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
          </div>
          <div className={styles.filterBox}>
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
          </div>
          <div className={styles.filterBox}>
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
          </div>
          <div className={styles.filterBox}>
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
              <p>${(product.price && product.price > 0) ? `${product.price}0` : "15.00"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
