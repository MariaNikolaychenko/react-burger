import { useEffect, useCallback, useState, ChangeEvent, FormEvent } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from '../index.module.css';
import { registerAction } from "../../services/auth/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getAuthInfo } from "../../services/auth/selectors";

export const Register = (): React.JSX.Element | null => {
	const { name, isRegisterSuccess, isRegisterFailed } = useSelector(getAuthInfo);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const dispatch = useAppDispatch();

	const [form, setValue] = useState({
		email: '', 
		password: '', 
		name: ''
	});
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	
	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(registerAction(form));
		},
		[dispatch, form]
	)

	useEffect(() => {
		if (name) {
			navigate(from, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isRegisterSuccess, name]);
	
	return (
		<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
			<h1 className={styles.formTitle}>Регистрация</h1>
			<Input 
				placeholder="Имя"
				extraClass="mt-6"
				name="name"
				value={form.name}
				onChange={handleChange} 
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}	
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
				<p className={styles.error}>Ошибка</p>
			}

			<div className={styles.formFooter}>
				<p className={styles.formFooterText}>Уже зарегистрированы? 
					<Link className={styles.formLink} to='/login'>Войти</Link></p>
			</div>
		</form>
	);
};