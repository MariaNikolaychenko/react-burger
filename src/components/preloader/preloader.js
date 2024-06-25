import styles from './preloader.module.css';

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.preloaderIcon}></div>
        </div>
    );
}

export default Preloader;