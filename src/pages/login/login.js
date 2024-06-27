import { useEffect, useCallback, useState }  from "react";
import { useAuth } from '../../services/authProvider';

import { 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';


export const Login = () => {
	
	let auth = useAuth();
	const [isUserLoaded, setUserLoaded] = useState(null);
	const navigate = useNavigate();
	
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
		password: ''
	});

	const handleChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	let handleSubmit = useCallback(
		e => {
			e.preventDefault();
			auth.signIn(form);
		},
		[auth, form]
	)

	if (isUserLoaded === null) return <Preloader />

	return (
		auth.user ?
		navigate('/', { replace: true }) :
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