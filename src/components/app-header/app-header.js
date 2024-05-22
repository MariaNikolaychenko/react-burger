import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "../app-header/app-header.module.css";

const AppHeader = () => {
	return (
		<>
			<div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
				<Logo />
			</div>
			<nav className={styles.nav}>
				<a href="/" className={`text text_type_main-default ${styles.link} ${styles.linkActive}`}>
					<BurgerIcon type="primary" />
					<span className={styles.text}>Конструктор</span>
				</a>
				<a href="/" className={`text text_type_main-default ${styles.link}`}>
					<ListIcon type="secondary" />
					<span className={styles.text}>Лента заказов</span>
				</a>
				<a href="/" className={`text text_type_main-default ${styles.link} ${styles.linkLast}`}>
					<ProfileIcon type="secondary" />
					<span className={styles.text}>Личный кабинет</span>
				</a>
			</nav>
		</>
	)
}

export default AppHeader;