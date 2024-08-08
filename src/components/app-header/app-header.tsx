import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "../app-header/app-header.module.css";
import { NavLink } from 'react-router-dom';

const AppHeader = (): React.JSX.Element => {
	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<a href="./">
						<Logo />
					</a>
				</div>
				<nav className={styles.nav}>
					<NavLink
						to="/"
						className={({isActive}) => isActive ? `${styles.linkActive} ${styles.link}` : `${styles.link}`}
					>
						<BurgerIcon type="primary" />
						<span className={styles.navText}>Конструктор</span>
					</NavLink>

					<NavLink
						to="/feed"
						className={({isActive}) => isActive ? `${styles.linkActive} ${styles.link}` : `${styles.link}`}
					>
						<ListIcon type="secondary" />
						<span className={styles.navText}>Лента заказов</span>
					</NavLink>
					<NavLink
						to="/profile"
						className={({isActive}) => isActive ? `${styles.linkActive} ${styles.link} ${styles.linkLast}` : `${styles.link} ${styles.linkLast}`}
					>
						<ProfileIcon type="secondary" />
						<span className={styles.navText}>Личный кабинет</span>
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader;