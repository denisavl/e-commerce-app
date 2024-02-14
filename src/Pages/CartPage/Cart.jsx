/* eslint-disable react/prop-types */
import styles from "./cart.module.css";
import Header from "../../components/Header/Header";
import emptyCartImg from "../../assets/empty-cart.png";
import { Link } from "react-router-dom";
// import { fetchCarousel } from "../../fetch";
// import { useQuery } from "@tanstack/react-query";

export default function Cart({cartProd}) {

  return (
    <div className={styles.cartContainer}>
      <Header cartProd={cartProd}/>
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
                    <div className={styles.productType}>
                      {product.product_type}
                    </div>
                    <p className={styles.productCode}>
                      Product code: {product.id}
                    </p>
                  </div>
                </div>
                <div className={styles.cartItemQuantity}>
                  <select className={styles.quantitySelect}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className={styles.cartItemPrice}>
                  <span>${product.price ? product.price : "15.00"}</span>
                </div>
                <div className={styles.cartItemSubtotal}>
                  <span>  ${((product.quantity * product.price) % 1 === 0) ? (product.quantity * product.price).toFixed(1) : (product.quantity * product.price)}</span>
                </div>
                <div className={styles.delete}>
                  <button type="button">X</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryContainer}>
              <h1 className={styles.summaryTitle}>Summary:</h1>
              <div className={styles.total}>
                <span>Total</span>
                <span>$600.0</span>
              </div>
              <div className={styles.deliveryCost}>
                <span>Delivery cost:</span>
                <span>$0.0</span>
              </div>
            </div>
            <div className={styles.totalAmountContainer}>
              <div className={styles.totalAmount}>
                <h1 className={styles.amount}>Total Amount:</h1>
                <h1 className={styles.amount}>$600.0</h1>
              </div>
              <div className={styles.noVAT}>
                <span>Total value without VAT</span>
                <span>$520.0</span>
              </div>
              <div className={styles.vat}>
                <span>19% VAT</span>
                <span>$180.0</span>
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
