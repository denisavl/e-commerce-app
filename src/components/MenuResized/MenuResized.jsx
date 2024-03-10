/* eslint-disable react/prop-types */
// MenuResized.js
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { motion } from "framer-motion";

export default function MenuResized({ toggleMenu }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.3 }} 
      className={styles.moduleContainer}
    >
      <div className={styles.container}>
        <div className={styles.closeMenu} onClick={toggleMenu}>
          <button type="button">CLOSE THE MENU</button>
        </div>
        <ul className={styles.buttons}>
          <motion.li
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: 0.1 }} 
          >
            <Link to="/shop" className={styles.btn}>
              Shop All
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link to="/face" className={styles.btn}>
              Face
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Link to="/eyes" className={styles.btn}>
              Eyes
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link to="/lips" className={styles.btn}>
              Lips
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Link to="/nails" className={styles.btn}>
              Nails
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Link to="/about" className={styles.btn}>
              About Us
            </Link>
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
}
