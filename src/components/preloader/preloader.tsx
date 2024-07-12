import styles from './preloader.module.css';

const Preloader = (): React.JSX.Element => {
    return (
        <div className={styles.preloader}>
            <div className={styles.preloaderIcon}></div>
        </div>
    );
}

export default Preloader;