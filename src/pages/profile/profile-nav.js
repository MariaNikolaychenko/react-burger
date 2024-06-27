import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authProvider";

import styles from "./profile.module.css";


export const ProfileNav = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	
	const handleLogout = () => {
		auth.signOut();
		navigate('/login');
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