import { ChangeEvent, FormEvent, useState } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { resetPasswordAction } from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors";

import styles from '../index.module.css';


export const ResetPassword = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { isResetPasswordSuccess, isForgotSuccess } = useSelector(getAuthInfo);
	const from = location.state?.from || "/login";

	const [form, setValue] = useState({ 
		password: '',
		token: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			resetPasswordAction(form)
		);
	};

	if (isResetPasswordSuccess) {
		return (
			<Navigate
				to={from}
				replace
			/>
		);
	}

	return (
		<>
		{isForgotSuccess &&
			<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
				<h1 className={styles.formTitle}>Восстановление пароля</h1>
				<PasswordInput 
					placeholder='Введите новый пароль' 
					name="password" 
					value={form.password}
					onChange={handleChange} 
					extraClass="mt-6" 
				/>
				<Input 
					placeholder='Введите код из письма' 
					name="token" 
					value={form.token}
					onChange={handleChange} 
					extraClass="mt-6" 
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
				<Button 
					type="primary" 
					extraClass="mt-6" 
					htmlType="submit"
				>
					Сохранить
				</Button>
				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Вспомнили пароль? 
						<Link className={styles.formLink} to="/login">Войти</Link>
					</p>
				</div>
			</form>
		}
		</>
	);
};