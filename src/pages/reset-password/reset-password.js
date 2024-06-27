import { useState } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import Preloader from '../../components/preloader/preloader';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors";

import styles from '../index.module.css';

export const ResetPassword = () => {
	const dispatch = useDispatch();
	const { isResetPasswordSuccess, isForgotSuccess } = useSelector(getAuthInfo);
	
	const [form, setValue] = useState({ 
		password: '',
		token: ''
	});


	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			resetPasswordAction(form)
		);
	};

	if (isResetPasswordSuccess) {
		return (
			<Navigate
				to={'/login'}
				replace
			/>
		);
	}

	return (
		isForgotSuccess ?
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
				/>
                <Button 
					type="primary" 
					extraClass="mt-6" 
					htmlType="submit" 
					disabled=""
				>
					Сохранить
				</Button>
				<div className={styles.formFooter}>
					<p className={styles.formFooterText}>Вспомнили пароль? 
						<Link className={styles.formLink} to="/login">Войти</Link>
					</p>
				</div>
			</form> :
			<Navigate to={'/'} />
	);
};