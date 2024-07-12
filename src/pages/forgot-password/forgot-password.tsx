import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState, ChangeEvent } from "react";
import { useAuth } from "../../services/authProvider";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { forgotPasswordAction } from "../../services/auth/actions";
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';
import { getAuthInfo } from "../../services/auth/selectors";

export const ForgotPassword = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isForgotSuccess } = useSelector(getAuthInfo);

	const auth = useAuth();

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

	useEffect(() => {
		if (auth.user) navigate(-1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);
	
	const init = () => {
		auth.getUser();
	};
	
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isForgotSuccess) { 	
		navigate('/reset-password', { replace: true });
	}

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