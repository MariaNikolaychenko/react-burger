import React from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import Preloader from '../../components/preloader/preloader';
import { Link } from 'react-router-dom';

import styles from '../index.module.css';

export const ResetPassword = () => {
	//const [isLoading, setIsLoading] = React.useState(true);

	const handleSubmint = (e) => {
		e.preventDefault();
		// dispatch(
		//   authenticationAction({ email: values.email, password: values.password })
		// );
	};

	return (
		// {isLoading ? <Preloader /> : 
			<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmint}>
				<h1 className={styles.formTitle}>Восстановление пароля</h1>
				<PasswordInput placeholder='Введите новый пароль' name="password" value="" onChange={handleSubmint} extraClass="mt-6" />
                <Input placeholder='Введите код из письма' name="token" value="" onChange={handleSubmint} extraClass="mt-6" />
                <Button type="primary" extraClass="mt-6" htmlType="submit" disabled="">Сохранить</Button>
				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Вспомнили пароль? 
						<Link className={styles.formLink} to="/login">Войти</Link>
					</p>
				</div>
			</form>
		//}
	);
};