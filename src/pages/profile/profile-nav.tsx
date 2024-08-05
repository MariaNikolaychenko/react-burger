import { NavLink, useNavigate } from "react-router-dom";

import styles from "./profile.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutAction } from "../../services/auth/actions";
import { useSelector } from "react-redux";
import { getAuthInfo } from "../../services/auth/selectors";
import { useEffect } from "react";


export const ProfileNav = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { name, isLogoutSuccess } = useSelector(getAuthInfo);

	useEffect(() => {
		if (!name) {
			navigate('/', { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isLogoutSuccess]);
	
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

			<div 
				onClick={handleLogout}
				className={styles.sidebarLink}>
				Выход
			</div>

			<div className="pt-20">
				<span className="text text_type_main-default text_color_inactive">
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</div>
		</nav>
	)
}