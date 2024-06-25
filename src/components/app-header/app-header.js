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
					<a href="/">
						<Logo />
					</a>
				</div>
				<nav className={styles.nav}>
					<a href="/" className={`${styles.link} ${styles.linkActive}`}>
						<BurgerIcon type="primary" />
						<span className={styles.navText}>Конструктор</span>
					</a>
					<a href="/" className={styles.link}>
						<ListIcon type="secondary" />
						<span className={styles.navText}>Лента заказов</span>
					</a>
					<a href="/profile" className={`${styles.link} ${styles.linkLast}`}>
						<ProfileIcon type="secondary" />
						<span className={styles.navText}>Личный кабинет</span>
					</a>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader;