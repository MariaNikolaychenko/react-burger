import styles from '../index.module.css';

export const NotFound404 = (): React.JSX.Element => {
    return(
		<div className={`${styles.positionCenter} ${styles.marginTop130}`}>
			<h2>Страница не найдена. Ошибка 404</h2>
		</div>
	);
};