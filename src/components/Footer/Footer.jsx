import styles from "../Footer/footer.module.css";
import facebookImg from "../../assets/social/facebook.svg";
import youtubeImg from "../../assets/social/youtube.svg";
import instagramImg from "../../assets/social/instagram.svg";
export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerMain}>
      <ul className={styles.column}>
    <li><a>Contact form</a></li>
    <li><a>Frequent questions</a></li>
    <li><a>My account</a></li>
    <li><a>Gift Card</a></li>
    <li><a>Gift Card Regulations</a></li>
</ul>
<ul className={styles.column}>
    <li><a>Stores</a></li>
    <li><a>Terms of delivery</a></li>
    <li><a>Return products</a></li>
    <li><a>Accepted payment methods</a></li>
    <li><a>Online services</a></li>
</ul>
<ul className={styles.column}>
    <li><a>About Glam</a></li>
    <li><a>Careers</a></li>
    <li><a>Our commitments</a></li>
    <li><a>International</a></li>
    <li><a>Discover Glam</a></li>
</ul>
<ul className={styles.column}>
    <li><a>Privacy and cookies policy</a></li>
    <li><a>Cookies preferences</a></li>
    <li><a>Legal notices and CGU</a></li>
    <li><a>General conditions of sale</a></li>
    <li><a>Loyalty program</a></li>
</ul>
<ul className={styles.column} id={styles.socialLogo}>
        <img src={facebookImg} alt="facebook logo" />
        <img src={instagramImg} alt="instagram logo" />
        <img src={youtubeImg} alt="youtube logo" />
</ul>

      </div>
      <div className={styles.footerBottom}>
        <span>© 2024 Glam</span>
        <button type="button" className={styles.btn}>
          Privacy
        </button>
        <button type="button" className={styles.btn}>
          Accessibility
        </button>
        <button type="button" className={styles.btn}>
          Terms of Service
        </button>
        <button type="button" className={styles.btn}>
          Refund Policy
        </button>
        <button type="button" className={styles.btn}>
          Conformity
        </button>
      </div>
    </div>
  );
}
