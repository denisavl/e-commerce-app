import styles from '../LoadingPage/loading.module.css'
export default function Loading(){
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
      );
}