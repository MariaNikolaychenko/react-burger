import { useEffect, useCallback, useState } from "react";
import { useAuth } from '../../services/authProvider';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';


export const Register = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [form, setValue] = useState({
		email: '', 
		password: '', 
		name: ''
	});
	
	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			auth.register(form);
		},
		[auth, form]
	)
	
	useEffect(() => {
		if (auth.user) navigate('/', { replace: true });
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
		!auth.user &&
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

			<div className={styles.formFooter}>
				<p className={styles.formFooterText}>Уже зарегистрированы? 
					<Link className={styles.formLink} to='/login'>Войти</Link></p>
			</div>
		</form>
	);
};