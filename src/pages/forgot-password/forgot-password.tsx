import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { forgotPasswordAction } from "../../services/auth/actions";

import styles from '../index.module.css';
import { getAuthInfo } from "../../services/auth/selectors";

export const ForgotPassword = (): React.JSX.Element => {
	const { name, isForgotSuccess } = useSelector(getAuthInfo);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const dispatch = useAppDispatch();
	
	const [form, setValue] = useState({ 
		email: '' 
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(forgotPasswordAction(form.email));
	};
	
	if (isForgotSuccess) { 	
		navigate('/reset-password', { replace: true });
	}

	useEffect(() => {
		if (name) navigate(from, { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
	);
};