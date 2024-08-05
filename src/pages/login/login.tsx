import { useEffect, useCallback, useState, FormEvent, ChangeEvent }  from "react";

import { 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';
import { getAuthInfo } from "../../services/auth/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginAction } from "../../services/auth/actions";


export const Login = (): React.JSX.Element => {	
	const { name, isLoginSuccess, isLoginLoading, isLoginFailed } = useSelector(getAuthInfo);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const dispatch = useAppDispatch();
	
	const [form, setValue] = useState({
		email: '', 
		password: ''
	});
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	
	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(loginAction(form));
		},
		[dispatch, form]
	)
	
	useEffect(() => {
		if (name) {
			navigate(from, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isLoginSuccess, name]);

	if (isLoginLoading) return <Preloader />
	
	return (
		<form className={`${styles.positionCenter} ${styles.form}`} onSubmit={handleSubmit}>
			<h1 className={styles.formTitle}>Вход</h1>
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
				type="primary" 
				extraClass="mt-6" 
				htmlType="submit" 
			>
				Войти
			</Button>

			{isLoginFailed &&
				<p className={styles.error}>Ошибка</p>
			}

			<div className={styles.formFooter}>
				<p className={styles.formFooterText}>Вы — новый пользователь? 
					<Link to="/register" className={styles.formLink}>Зарегистрироваться</Link>
				</p>
				<p className={styles.formFooterText}>Забыли пароль?
					<Link className={styles.formLink} to='/forgot-password'>Восстановить пароль</Link></p>
			</div>
		</form>
	);
};