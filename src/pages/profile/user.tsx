import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useAuth } from '../../services/authProvider';

import { 
	Input, 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from "../../components/preloader/preloader";

import styles from '../index.module.css';

export const UserProfile = (): React.JSX.Element => {
	const auth = useAuth();

	const [ isDataChanged, setIsDataChanged ] = useState(false);

	const [form, setValue] = useState({
		email: auth.user!.email,
		name: auth.user!.name,
		password: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsDataChanged(true);
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			auth.updateUser(form);
		},
		[auth, form]
	)
	
	const handleCancel = () => {
		setIsDataChanged(false);
		setValue({
			email: auth.user!.email,
			name: auth.user!.name,
			password: ''
		})
	}
	const init = () => {
		auth.getUser();
	};
	
	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
    return (
		<>
		{
			auth.user ?
			<form onSubmit={handleSubmit} onReset={handleCancel}>
				<Input 
					name="name"
					placeholder="Имя"
					value={form.name!}
					onChange={handleChange}
					icon="EditIcon"
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				/>
				<EmailInput 
					extraClass="mt-6" 
					name="email" 
					value={form.email!}
					onChange={handleChange}
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
			</form> :
			<Preloader />
		}
		</>
	)
}