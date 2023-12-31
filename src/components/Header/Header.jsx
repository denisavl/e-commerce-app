import logoImg from "../../assets/logo.png";
import styles from "./header.module.css";
import basketIcon from "../../assets/shopping-cart.png";
import { Link } from "react-router-dom";

const Header = () => {
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
        <div>
          <form className={styles.formContainer}>
            <img
              className={styles.searchIcon}
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E"
              alt=""
            />
            <input
              type="text"
              name="search-bar"
              className={styles.searchBar}
              placeholder="Search"
            />
          </form>
        </div>
        <img
          className={styles.basketShop}
          src={basketIcon}
          alt="basket icon img"
        />
      </div>
    </div>
  );
};

export default Header;
