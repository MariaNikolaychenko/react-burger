//import React, { useEffect } from "react";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import Preloader from '../../components/preloader/preloader';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { forgotPasswordAction } from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors";

import styles from '../index.module.css';

export const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { isForgotSuccess } = useSelector(getAuthInfo);

	const [form, setValue] = useState({ 
		email: '' 
	});
	//const [isLoading, setIsLoading] = React.useState(true);

	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			forgotPasswordAction(form.email)
		);
	};

	// useEffect(() => {
	// 	isForgotSuccess && <Navigate to="/reset-password" replace />;
	// }, [isForgotSuccess])

	if (isForgotSuccess) {
		return (
			<Navigate
				to={'/reset-password'}
				replace
			/>
		);
	}

	return (
		// {isLoading ? <Preloader /> : 
			<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
				<h1 className={styles.formTitle}>Восстановление пароля</h1>
				<EmailInput 
					extraClass="mt-6" 
					placeholder='Укажите e-mail' 
					name="email" 
					value={form.email} 
					onChange={handleChange} 
				/>
                <Button 
					type="primary" 
					extraClass="mt-6" 
					htmlType="submit"
				>
					Восстановить
				</Button>
				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Вспомнили пароль? 
						<Link className={styles.formLink} to="/login">Войти</Link>
					</p>
				</div>
			</form>
		//}
	);
};