/* eslint-disable react/prop-types */
import styles from "../CartPreview/cartPreview.module.css";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/infoIcon.svg";
import closeBtn from "../../assets/closeBtn.png";
import { motion } from "framer-motion";

export default function CartPreview({
  product,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
}) {
  function incrementCount(productId, shade) {
    const updatedCartProd = product.map((item) => {
      if (item.id === productId && item.color_prod === shade) {
        if (item.quantity < 100) {
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    });
    setCartProd(updatedCartProd);
  }

  function decrementCount(productId, shade) {
    const updatedCartProd = product.map((item) => {
      if (item.id === productId && item.color_prod === shade) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCartProd(updatedCartProd);
  }

  return (
    showCart && (
      <div className={styles.moduleContainer} onClick={toggleActive}>
        <motion.div
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className={styles.cartPreviewContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={styles.continueShoppingBtn}
            onClick={toggleActive}
          >
            CONTINUE SHOPPING
          </button>
          <div className={styles.shoppingCart}>Shopping Cart</div>
          {product.length === 0 && (
            <>
              <div className={styles.emptyCart}>
                <img
                  src={infoIcon}
                  className={styles.infoIcon}
                  alt="Info Icon"
                />
                <span>Shopping Cart is empty</span>
              </div>
            </>
          )}

          {product.length > 0 && (
            <div className={styles.container}>
              {product.map((item, index) => (
                <div key={index} className={styles.prodContainer}>
                  <div className={styles.left}>
                    <img
                      className={styles.productImg}
                      src={item.api_featured_image}
                      alt={item.name}
                    />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.headerCont}>
                      <div className={styles.name}>{item.name}</div>
                      <img
                        src={closeBtn}
                        alt="Close Button"
                        onClick={() => handleDelete(item.id, item.color_prod)}
                      />
                    </div>
                    <div className={styles.shade}>
                      {item.color_prod && <span>{item.color_prod}</span>}
                    </div>
                    <div className={styles.bottom}>
                      <div className={styles.quantity}>
                        <button
                          type="button"
                          className={styles.minusQuantity}
                          onClick={() =>
                            decrementCount(item.id, item.color_prod)
                          }
                        >
                          -
                        </button>
                        <div className={styles.countQuantity}>
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          className={styles.plusQuantity}
                          onClick={() =>
                            incrementCount(item.id, item.color_prod)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.price}>
                        $
                        {item.price > 0 && item.price
                          ? (item.quantity * item.price).toFixed(1)
                          : (item.quantity * "15.0").toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/cart">
            <button type="button" className={styles.completeOrderBtn}>
              VIEW SHOPPING CART
            </button>
          </Link>
        </motion.div>
      </div>
    )
  );
}
