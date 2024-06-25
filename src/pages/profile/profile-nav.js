import React from "react";

import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./profile.module.css"
import { logoutAction } from "../../services/auth/actions";

export const ProfileNav = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAction());
	}

	return (
		<nav className={styles.sidebar}>
			<NavLink 
				end
				to="."
				className={({isActive}) => isActive ? `${styles.sidebarLink} ${styles.activated}` : `${styles.sidebarLink}`}
			>
				Профиль
			</NavLink>

			<NavLink 
				to="./orders"
				className={({isActive}) => isActive ? `${styles.sidebarLink} ${styles.activated}` : `${styles.sidebarLink}`}
			>
				История заказов
			</NavLink>

			<Link 
				to="/login"
				onClick={handleLogout}
				className={styles.sidebarLink}>
				Выход
			</Link>

			<div className="pt-20">
				<span className="text text_type_main-default text_color_inactive">
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</div>
		</nav>
	)
}