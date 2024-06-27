import { useCallback, useState } from "react";
import { useAuth } from '../../services/authProvider';

import { 
	Input, 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';


export const UserProfile = () => {
	const auth = useAuth();

	const [ isDataChanged, setIsDataChanged ] = useState(false);
	
	const [form, setValue] = useState({
		email: auth.user.email,
		name: auth.user.name,
		password: ''
	});

	const handleChange = e => {
		setIsDataChanged(true);
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	let handleSubmit = useCallback(
		e => {
			e.preventDefault();
			auth.updateUser(form);
		},
		[auth, form]
	)
	
	const handleCancel = () => {
		setIsDataChanged(false);
		setValue({
			email: auth.user.email,
			name: auth.user.name,
			password: ''
		})
	}

    return auth.user ?
		<form onSubmit={handleSubmit} onReset={handleCancel}>
			<Input 
				name="name" 
				placeholder="Имя" 
				value={form.name}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			<EmailInput 
				extraClass="mt-6" 
				name="email" 
				value={form.email}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			<PasswordInput 
				extraClass="mt-6" 
				placeholder="Новый пароль"
				name="password"
				value={form.password}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			{isDataChanged && 
				<div className={`${styles.formFooter} ${styles.marginLeft150}`}>
					<Button 
						type="secondary" 
						size="medium"
						htmlType='reset'
						onClick={handleCancel}
					>
						Отмена
					</Button>
					<Button 
						type="primary" 
						extraClass="ml-5" 
						htmlType='submit'
					>
						Сохранить
					</Button>
				</div>
			}

			{auth.error && 
				<p className={styles.error}>{auth.error}</p>
			}
		</form> :
		<Preloader />

}