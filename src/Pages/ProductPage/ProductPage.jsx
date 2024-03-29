/* eslint-disable react/prop-types */
import Header from "../../components/Header/Header";
import styles from "../ProductPage/productpage.module.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../fetch";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingPage/Loading";

export default function ProductPage({
  productId,
  category,
  cartProd,
  decrementCount,
  incrementCount,
  count,
  addToCart,
  showCart,
  toggleActive,
  handleDelete,
  handleShade,
  shade,
  setCount,
  setCartProd,
  setShade,
  setResults,
  setIsLoading,
  searchItem,
  setSearchItem,
}) {
  const [displayProduct, setDisplayProduct] = useState(null);
  const product = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchProducts([
        "eyebrow",
        "eyeliner",
        "eyeshadow",
        "mascara",
        "foundation",
        "blush",
        "bronzer",
        "lip_liner",
        "lipstick",
        "nail_polish",
      ]),
  });
  useEffect(() => {
    if (product.isSuccess) {
      const foundProduct = product.data?.successfulResults
        .flatMap((result) => result.data)
        .find((p) => p.id === productId);

      setDisplayProduct(foundProduct);
    }
  }, [product.data, product.isSuccess, productId]);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (displayProduct) {
      if (
        displayProduct.product_colors &&
        displayProduct.product_colors.length > 0
      ) {
        setShade(displayProduct.product_colors[0].colour_name);
      }
    }
  }, [displayProduct, setShade]);

  useEffect(() => {
    return () => {
      setCount(1);
    };
  }, [productId, setCount]);

  if (product.isLoading) return <Loading />;

  return (
    <div>
      <Header
        cartProd={cartProd}
        showCart={showCart}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        setCartProd={setCartProd}
        setResults={setResults}
        setIsLoading={setIsLoading}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
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
              <Link to={`/${category}`} className={styles.btnNav}>
                {capitalizeFirstLetter(category)}
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link className={styles.btnNav}>{displayProduct?.name}</Link>
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
                dangerouslySetInnerHTML={{ __html: displayProduct.description }}
              />
              <div className={styles.colorsContainer}>
                <div className={styles.shadeMenuTitle}>CHOOSE YOUR SHADE</div>
                <div className={styles.shadeWrapper}>
                  <div className={styles.shades}>
                    {displayProduct.product_colors.length === 0 ? (
                      <div>No shades available</div>
                    ) : (
                      displayProduct.product_colors.map((color, index) => (
                        <div
                          className={`${styles.colors} ${
                            shade === color.colour_name ? styles.selected : ""
                          }`}
                          onClick={() => handleShade(color)}
                          key={index}
                          style={{ backgroundColor: color.hex_value }}
                        ></div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.productStock}>
                <span className={styles.deliveryStatus}></span>
                <span className={styles.availableStatus}>Available Online</span>
              </div>
              <div className={styles.pricesAddToCart}>
                <button
                  type="submit"
                  className={styles.addBtn}
                  onClick={() => addToCart()}
                >
                  <span className={styles.addTitleBtn}>ADD</span>
                  <span className={styles.price}>
                    $
                    {displayProduct.price && displayProduct.price > 0
                      ? `${displayProduct.price}`
                      : `${(displayProduct.price = "15.0")}`}
                  </span>
                </button>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    className={styles.minusQuantity}
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <div className={styles.countQuantity}>{count}</div>
                  <button
                    type="button"
                    className={styles.plusQuantity}
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
