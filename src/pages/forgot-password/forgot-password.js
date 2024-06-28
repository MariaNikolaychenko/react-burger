import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../services/authProvider";

import { forgotPasswordAction } from "../../services/auth/actions";
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';

export const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const auth = useAuth();

	const [form, setValue] = useState({ 
		email: '' 
	});

	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			forgotPasswordAction(form.email)
		);
	};

		
	useEffect(() => {
		if (auth.user) navigate(-1, { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);
	
	const init = () => {
		auth.getUser();
	};
	
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	if (auth.loading) return <Preloader />

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