/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import styles from "../AboutUsPage/aboutUs.module.css";
import Header from "../../components/Header/Header";
import shopImg from "../../assets/shop.jpg";

export default function AboutUs({
  cartProd,
  showCart,
  toggleActive,
  handleDelete,
  setCartProd,
}) {
  return (
    <div>
      <Header
        cartProd={cartProd}
        showCart={showCart}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        setCartProd={setCartProd}
      />
      <div className={styles.content}>
        <div className={styles.aboutTitle}>#AboutGlam</div>
        <div className={styles.slogan}>
          We're a vibrant community driven by the belief that everyone deserves
          to feel confident and glamorous in their own skin
        </div>
        <div className={styles.poster}></div>
        <div className={styles.shopCart}>
         <div><img className={styles.shopImg} src={shopImg} /></div> 
          <div className={styles.shopDetails}>
            <span className={styles.shopTitle}>Made with love in Romania</span>
            <div className={styles.details}>
              Our journey began with a group of makeup enthusiasts who shared a
              common passion for self-expression through cosmetics. Inspired by
              the power of transformation of makeup, we set out to create a space
              where individuals could unleash their creativity and embrace their
              unique beauty. 
              <br /> What sets Glam apart is our unwavering commitment
              to exclusivity and diversity. We celebrate beauty in all its forms
              and strive to offer a wide range of products that cater to every
              skin tone, gender identity, and style preference. From bold and
              adventurous looks to natural and understated elegance, there's
              something for everyone at Glam. 
              <br /> But Glam is more than just a
              beauty retailer; it's a supportive community where makeup lovers
              can come together to share their experiences, learn from each
              other, and celebrate their passion for all things beauty. Whether
              you're a makeup newbie seeking guidance or a seasoned artist
              looking for inspiration, you'll find a welcoming home at Glam. At
              Glam, we believe in beauty with a purpose.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
