import { useEffect, useCallback, useState } from "react";
import { useAuth } from '../../services/authProvider';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';

import styles from '../index.module.css';
import Preloader from "../../components/preloader/preloader";

export const Register = () => {
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
		email: '', 
		password: '', 
		name: ''
	});
	
	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	
	let handleSubmit = useCallback(
		e => {
			e.preventDefault();
			auth.register(form);
		},
		[auth, form]
	)
	
	if (auth.user) {
		return (
			<Navigate
				to={'/'}
			/>
		);
	}
	
	if (isUserLoaded === null) return <Preloader />

	return (
		isUserLoaded ? 
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

			{auth.error && 
				<p className={styles.error}>{auth.error}</p>
			}

			<div className={styles.formFooter}>
				<p className={styles.formFooterText}>Уже зарегистрированы? 
					<Link className={styles.formLink} to='/login'>Войти</Link></p>
			</div>
		</form> :
		<Navigate to={'/'} />
	);
};