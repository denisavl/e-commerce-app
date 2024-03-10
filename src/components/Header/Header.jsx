/* eslint-disable react/prop-types */
import logoImg from "../../assets/logo.png";
import menuImg from "../../assets/menuIcon.png";
import styles from "./header.module.css";
import basketIcon from "../../assets/shopping-cart.png";
import CartPreview from "../CartPreview/CartPreview";
import MenuResized from "../MenuResized/MenuResized";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence} from "framer-motion";

const Header = ({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
  setResults,
  setIsLoading,
  searchItem,
  setSearchItem,
}) => {
  const totalQuantity = cartProd.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  function toggleMenu(){
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.headerContainer}>
      {showMenu ? (
        <div className={styles.resizedContainer}>
          <div className={styles.firstRow}>
            <div className={styles.menuButton} onClick={toggleMenu}>
              <img src={menuImg} alt="menu" />
            </div>
            <AnimatePresence>
             {openMenu && <MenuResized toggleMenu={toggleMenu}/>}
            </AnimatePresence>
            <div>
              <Link to="/">
                <img className={styles.logo} src={logoImg} alt="logo image" />
              </Link>
            </div>
            <div className={styles.cart} onClick={toggleActive}>
              <img
                className={styles.basketShop}
                src={basketIcon}
                alt="basket icon img"
              />
              <span className={styles.countCart}>{totalQuantity}</span>
            </div>
          </div>

          <div className={styles.secondRow}>
            <SearchBar
              setResults={setResults}
              setIsLoading={setIsLoading}
              searchItem={searchItem}
              setSearchItem={setSearchItem}
            />
          </div>
        </div>
      ) : (
        <div className={styles.bigContainer}>
          <ul className={styles.buttons}>
          <li>
            <Link to="/shop" className={styles.btn}>
              Shop All
            </Link>
          </li>
          <li>
            <Link to="/face" className={styles.btn}>
              Face
            </Link>
          </li>
          <li>
            <Link to="/eyes" className={styles.btn}>
              Eyes
            </Link>
          </li>
          <li>
            <Link to="/lips" className={styles.btn}>
              Lips
            </Link>
          </li>
          <li>
            <Link to="/nails" className={styles.btn}>
              Nails
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.btn}>
              About Us
            </Link>
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
          setSearchItem={setSearchItem}
        />
        <div className={styles.cart} onClick={toggleActive}>
          <img
            className={styles.basketShop}
            src={basketIcon}
            alt="basket icon img"
          />
          <span className={styles.countCart}>{totalQuantity}</span>
        </div>
      </div>
      </div> 
      )}
      <AnimatePresence>
      {showCart && (
        <CartPreview
          product={cartProd}
          showCart={showCart}
          toggleActive={toggleActive}
          handleDelete={handleDelete}
          setCartProd={setCartProd}
        />
      )}
      </AnimatePresence>
     
    </div>
  );
};

export default Header;
