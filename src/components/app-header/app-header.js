import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "../app-header/app-header.module.css";

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<nav className={styles.nav}>
					<a href="/" className={`${styles.link} ${styles.linkActive}`}>
						<BurgerIcon type="primary" />
						<span className={styles.text}>Конструктор</span>
					</a>
					<a href="/" className={styles.link}>
						<ListIcon type="secondary" />
						<span className={styles.text}>Лента заказов</span>
					</a>
					<a href="/" className={`${styles.link} ${styles.linkLast}`}>
						<ProfileIcon type="secondary" />
						<span className={styles.text}>Личный кабинет</span>
					</a>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader;