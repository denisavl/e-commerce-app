// import posterImg from '../../assets/poster.jpg'
import styles from './poster.module.css'
export default function Poster(){
    return (
        <div className={styles.container}>
        {/* <img className={styles.imgPoster} src={posterImg} alt="poster image" /> */}
        <div className={styles.content}>
            <h1>Elevate your look with our stunning lipstick collection.</h1>
            <p>Long-lasting color for perfect lips.</p>
            <button type="button" className={styles.btn}>Shop Now</button>
        </div>
        </div>
    )
}