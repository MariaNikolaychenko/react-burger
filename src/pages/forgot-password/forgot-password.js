import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { forgotPasswordAction } from "../../services/auth/actions";
import { useAuth } from "../../services/authProvider";

import styles from '../index.module.css';
import Preloader from "../../components/preloader/preloader";

export const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let auth = useAuth();

	const [isUserLoaded, setUserLoaded] = useState(null);

	const init = async () => {
		await auth.getUser();
		setUserLoaded(true);
	};

	useEffect(() => {
		init();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	if (isUserLoaded === null) return <Preloader />

	return (
		auth.user ?
		navigate(-1, { replace: true }) :
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