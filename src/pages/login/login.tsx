import { useEffect, useCallback, useState, FormEvent, ChangeEvent }  from "react";
import { useAuth } from '../../services/authProvider';

import { 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';


export const Login = (): React.JSX.Element => {	
	const auth = useAuth();
	const navigate = useNavigate();
	
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
			auth.signIn(form);
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

			{auth.error &&
				<p className={styles.error}>{auth.error}</p>
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