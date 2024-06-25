import React, { useState } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import Preloader from '../../components/preloader/preloader';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from '../index.module.css';
import { registerAction } from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors"

export const Register = () => {

	const { isRegisterSuccess, isRegisterFailed } = useSelector(getAuthInfo);
	const dispatch = useDispatch();

	const [form, setValue] = useState({
		email: '', 
		password: '', 
		name: ''
	});
	//const [isLoading, setIsLoading] = React.useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			registerAction(form)
		);
	};

	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	if (isRegisterSuccess) {
		return (
			<Navigate
				to={'/'}
			/>
		);
	}

	return (
		// {isLoading ? <Preloader /> : 
			<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
				<h1 className={styles.formTitle}>Регистрация</h1>
				<Input 
					placeholder="Имя" 
					extraClass="mt-6" 
					name="name" 
					value={form.name} 
					onChange={handleChange} 
				/>
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
					extraClass="mt-6"
					type="primary"
					htmlType="submit"
				>
					Зарегистрироваться
				</Button>

				{isRegisterFailed && 
					<p className={styles.error}>Произошла ошибка, попробуйте снова.</p>
				}

				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Уже зарегистрированы? 
						<Link className={styles.formLink} to='/login'>Войти</Link></p>
				</div>
			</form>

		//}
	);
};