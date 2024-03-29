// import posterImg from '../../assets/poster.jpg'
import styles from "./poster.module.css";
import { Link } from "react-router-dom";
export default function Poster() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Elevate your look with our stunning lipstick collection.</h1>
        <p>Long-lasting color for perfect lips.</p>
        <Link to="/lipstick">
          <button type="button" className={styles.btn}>
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
