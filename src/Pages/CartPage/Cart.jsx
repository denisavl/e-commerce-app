/* eslint-disable react/prop-types */
import styles from "./cart.module.css";
import Header from "../../components/Header/Header";
import emptyCartImg from "../../assets/empty-cart.png";
import { Link } from "react-router-dom";
// import { fetchCarousel } from "../../fetch";
// import { useQuery } from "@tanstack/react-query";

export default function Cart({cartProd, handleDelete, showCart, toggleActive, setCartProd}) {
  const totalPrice = cartProd.reduce((total, item) => total + (item.quantity*item.price), 0);
  const priceWithoutVAT = totalPrice / 1.19;

  function incrementCount(productId, shade) {
    const updatedCartProd = cartProd.map(item => {
      if (item.id === productId && item.color_prod === shade) {
        if (item.quantity <100) {
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    })
    setCartProd(updatedCartProd);
  }

  function decrementCount(productId, shade) {
    const updatedCartProd = cartProd.map(item => {
      if (item.id === productId && item.color_prod === shade) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    })
    setCartProd(updatedCartProd);
  }

  return (
    <div className={styles.cartContainer}>
      <Header 
      cartProd={cartProd} 
      showCart={showCart} 
      toggleActive={toggleActive}
      handleDelete={handleDelete}
      setCartProd={setCartProd}/>
      {cartProd.length == 0 && (
        <div className={styles.emptyCartContainer}>
          <h1 className={styles.emptyCartTitle}>Shopping cart is empty</h1>
          <img
            src={emptyCartImg}
            alt="empty cart image"
            className={styles.emptyCartImg}
          />
          <Link to="/" className={styles.continueShopping}>
            CONTINUE SHOPPING
          </Link>
        </div>
      )}

      {cartProd.length > 0 && (
        <div className={styles.filledCartContainer}>
          <h1 className={styles.filledCartTitle}>Shopping cart</h1>
          <div className={styles.cartContent}>
            <div className={styles.cartTableHeader}>
              <div className={styles.cartHeaderInfo}>Product</div>
              <div className={styles.cartHeaderQuantity}>Amount</div>
              <div className={styles.cartHeaderUnitPrice}>Unit Price</div>
              <div className={styles.cartHeaderSubtotal}>Subtotal</div>
            </div>
            {cartProd.map((product, index) => (
              <div key={index} className={styles.cartItem}>
                <div className={styles.cartInfo}>
                  <div className={styles.imgProductCont}>
                    <img
                      className={styles.productImg}
                      src={product.api_featured_image}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.cartItemDetails}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.shade}>Color: {product.color_prod}</p>
                    <p className={styles.productCode}>
                      Product code: {product.id}
                    </p>
                  </div>
                </div>
                <div className={styles.cartItemQuantity}>
                <button type="button" className={styles.minusQuantity} onClick={() => decrementCount(product.id, product.color_prod)}>-</button>
                    <div className={styles.countQuantity}>{product.quantity}</div>
                    <button type="button" className={styles.plusQuantity} onClick={() => incrementCount(product.id, product.color_prod)}>+</button>
                </div>
                <div className={styles.cartItemPrice}>
                  <span>${product.price > 0 && product.price ? (product.quantity * product.price).toFixed(1) : (product.quantity * '15.0').toFixed(1)}</span>
                </div>
                <div className={styles.cartItemSubtotal}>
                  <span>  ${((product.quantity * product.price) % 1 === 0) ? (product.quantity * product.price).toFixed(1) : (product.quantity * product.price)}</span>
                </div>
                <div className={styles.delete}>
                  <button type="button" onClick={() => handleDelete(product.id, product.color_prod)}>X</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryContainer}>
              <h1 className={styles.summaryTitle}>Summary:</h1>
              <div className={styles.total}>
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              <div className={styles.deliveryCost}>
                <span>Delivery cost:</span>
                <span>$0.0</span>
              </div>
            </div>
            <div className={styles.totalAmountContainer}>
              <div className={styles.totalAmount}>
                <h1 className={styles.amount}>Total Amount:</h1>
                <h1 className={styles.amount}>${totalPrice}</h1>
              </div>
              <div className={styles.noVAT}>
                <span>Total value without VAT</span>
                <span>${priceWithoutVAT.toFixed(1)}</span>
              </div>
              <div className={styles.vat}>
                <span>19% VAT</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
          <div className={styles.promotionalCode}>
            <label htmlFor="promo"></label>
            <input
              type="text"
              name="promo"
              className={styles.promoCode}
              placeholder="Promotional code"
            />
          </div>
          <div className={styles.completeOrder}>
            <button type="button">COMPLETE THE ORDER</button>
          </div>
        </div>
      )}
    </div>
  );
}
