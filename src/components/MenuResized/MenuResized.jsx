/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
export default function MenuResized({toggleMenu}) {
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.container}>
      <div className={styles.closeMenu} onClick={toggleMenu}>
        <button type="button">CLOSE THE MENU</button>
      </div>
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
    </div>
    </div>
    
  );
}
