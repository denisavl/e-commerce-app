import Header from "../../components/Header/Header";
import styles from "../ProductPage/productpage.module.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../fetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const category = ["lipstick"];
  const [allProducts, setAllProducts] = useState([]);

  const product = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProducts(category),
  });

  useEffect(() => {
    if (product.isSuccess) {
      const products = product.data.successfulResults.flatMap(
        (result) =>
          result.data.map((product) => ({
            ...product,
            product_type: result.productType,
          })) || []
      );
      setAllProducts(products);
      //   console.log(products);
    }
  }, [product.data, product.isSuccess]);
  const displayProduct = allProducts[100];
  console.log(displayProduct);
  const htmlContent = displayProduct.description;
  return (
    <div>
      <Header />
      <div className={styles.pageContent}>
        <nav className={styles.navBar}>
          <ul className={styles.navContainer}>
            <li className={styles.homeBtn}>
              <span>❮</span>
              <Link to="/" className={styles.btnNav}>
                Home
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link to="/face" className={styles.btnNav}>
                Face
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link className={styles.btnNav}>Product</Link>
            </li>
          </ul>
        </nav>
          {displayProduct && (
            <div className={styles.productContainer}>
              <div className={styles.imageContainer}>
                <img
                  src={displayProduct.api_featured_image}
                  alt={displayProduct.name}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productDetails}>
                <div className={styles.brand}>{displayProduct.brand}</div>
                <div className={styles.name}>{displayProduct.name}</div>
                <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
                <div className={styles.colorsContainer}>
                    <div className={styles.shadeMenuTitle}>CHOOSE YOUR SHADE</div>
                    <div className={styles.shadeWrapper}>
                      <div className={styles.shades}>
                      {displayProduct.product_colors.map((color, index) => (
                        <div key={index} className={styles.colors} style={{backgroundColor: color.hex_value }}>
                        </div>
                      ))}
                      </div>
                    </div>

                </div>
                <div className={styles.productStock}>
                  <span className={styles.deliveryStatus}></span>
                  <span className={styles.availableStatus}>Available Online</span>
                </div>
                <div className={styles.pricesAddToCart}>
                <button type="submit" className={styles.addBtn}>
                  <span className={styles.addTitleBtn}>ADD</span>
                  <span className={styles.price}>{displayProduct.price? displayProduct.price : '15.0'}$</span>
                </button>
                    <div className={styles.quantity}>
                      <button type="button" className={styles.minusQuantity}>-</button>
                      <div className={styles.countQuantity}>1</div>
                      <button type="button" className={styles.plusQuantity}>+</button>
                    </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
