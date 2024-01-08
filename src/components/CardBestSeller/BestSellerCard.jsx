/* eslint-disable react/prop-types */
import styles from '../CardBestSeller/bestSellerCard.module.css'

export default function CardBestSeller({product}){
    return (
        <div className={styles.cardContainer}>
            <img className={styles.productImg} src={product.api_featured_image} alt={product.name} />
            <h1 className={styles.brand}>{product.brand}</h1>
            <p>{product.name}</p>
            <p>${product.price ? product.price : '15.00'}</p>
        </div>
    )
}