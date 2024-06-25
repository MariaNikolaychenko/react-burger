import React, { useState }  from "react";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import Preloader from '../../components/preloader/preloader';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from '../index.module.css';
import { loginAction } from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors"

export const Login = () => {
	const { isLoginSuccess, isLoginFailed } = useSelector(getAuthInfo);
	const dispatch = useDispatch();

	const [form, setValue] = useState({
		email: '', 
		password: '', 
		name: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
		  loginAction(form)
		);
	};

	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	if (isLoginSuccess) {
		return (
			<Navigate
				to={'/'}
			/>
		);
	}

	return (
		// {isLoading ? <Preloader /> : 
			<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
				<h1 className={styles.formTitle}>Вход</h1>
				<EmailInput 
					extraClass="mt-6" 
					name="email" 
					value={form.email}  
					onChange={handleChange} 
				/>
				<PasswordInput 
					extraClass="mt-6" 
					name="password" 
					value={form.password} 
					onChange={handleChange}  
				/>
				<Button 
					type="primary" 
					extraClass="mt-6" 
					htmlType="submit" 
				>
					Войти
				</Button>

				{isLoginFailed && 
					<p className={styles.error}>Ошибка</p>
				}

				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Вы — новый пользователь? 
						<Link to="/register" className={styles.formLink}>Зарегистрироваться</Link>
					</p>
					<p className={styles.formFooterText}>Забыли пароль?
						<Link className={styles.formLink} to='/forgot-password'>Восстановить пароль</Link></p>
				</div>

			</form>

		//}
	);
};