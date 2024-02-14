/* eslint-disable react/prop-types */
import styles from '../CartPreview/cartPreview.module.css'
import { Link } from 'react-router-dom';
import infoIcon from '../../assets/infoIcon.svg'
import closeBtn from '../../assets/closeBtn.png'

export default function CartPreview({product, showCart, toggleActive, handleDelete }){
    return (
        showCart && (
          <div className={styles.moduleContainer} onClick={toggleActive}>
            <div className={styles.cartPreviewContainer} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={styles.continueShoppingBtn} onClick={toggleActive}>
                CONTINUE SHOPPING
              </button>
              <div className={styles.shoppingCart}>Shopping Cart</div>
              {product.length === 0 && (
                <>
                  <div className={styles.emptyCart}>
                    <img src={infoIcon} className={styles.infoIcon} alt="Info Icon" />
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
                          <img src={closeBtn} alt="Close Button" onClick={() => handleDelete(item.id)}/>
                        </div>
                        <div className={styles.shade}>B16 - the shade of the product</div>
                        <div className={styles.bottom}>
                          <div className={styles.quantity}>
                            <button type="button" className={styles.minusQuantity}>-</button>
                            <div className={styles.countQuantity}>1</div>
                            <button type="button" className={styles.plusQuantity}>+</button>
                          </div>
                          <div className={styles.price}>
                            ${((item.quantity * item.price) % 1 === 0) ? (item.quantity * item.price).toFixed(1) : (item.quantity * item.price)}
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
            </div>
          </div>
        )
      );
}