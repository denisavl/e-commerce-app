/* eslint-disable react/prop-types */
import logoImg from "../../assets/logo.png";
import styles from "./header.module.css";
import basketIcon from "../../assets/shopping-cart.png";
import CartPreview from "../CartPreview/CartPreview";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";


const Header = ({cartProd, showCart, toggleActive, handleDelete, setCartProd, setResults, setIsLoading, searchItem, setSearchItem}) => {
  const totalQuantity = cartProd.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className={styles.headerContainer}>
      <ul className={styles.buttons}>
        <li>
          <Link to="/shop" className={styles.btn}>Shop All</Link>
        </li>
        <li>
          <Link to="/face" className={styles.btn}>Face</Link>
        </li>
        <li>
          <Link to="/eyes" className={styles.btn}>Eyes</Link>
        </li>
        <li>
          <Link to="/lips" className={styles.btn}>Lips</Link>
        </li>
        <li>
          <Link to="/nails" className={styles.btn}>Nails</Link>
        </li>
        <li>
          <Link to="/about" className={styles.btn}>About Us</Link>
        </li>
      </ul>
      <div>
        <Link to="/">
          <img className={styles.logo} src={logoImg} alt="logo image" />
        </Link>
      </div>
      <div className={styles.rightSide}>
      <SearchBar 
      setResults={setResults} 
      setIsLoading={setIsLoading}
      searchItem={searchItem}
      setSearchItem={setSearchItem}/>
        <div className={styles.cart} onClick={toggleActive}>
        <img
          className={styles.basketShop}
          src={basketIcon}
          alt="basket icon img"
        />
        <span className={styles.countCart}>{totalQuantity}</span>
        </div>
        
      </div>
      {showCart && 
      <CartPreview 
      product={cartProd} 
      showCart={showCart} 
      toggleActive={toggleActive}
      handleDelete={handleDelete}
      setCartProd={setCartProd}
      />}
    </div>
  );
};

export default Header;
