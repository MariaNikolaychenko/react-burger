import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { 
	Input, 
	EmailInput, 
	PasswordInput, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";

import profileStyles from './profile.module.css';
import styles from '../index.module.css';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getAuthInfo } from "../../services/auth/selectors";
import { updateUserDataAction } from "../../services/auth/actions";

export const UserProfile = (): React.JSX.Element => {
	const { name, email } = useSelector(getAuthInfo);
	const dispatch = useAppDispatch();

	const [ isDataChanged, setIsDataChanged ] = useState(false);

	const [form, setValue] = useState({
		email: email,
		name: name,
		password: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsDataChanged(true);
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(updateUserDataAction(form));
		},
		[dispatch, form]
	)
	
	const handleCancel = () => {
		setIsDataChanged(false);
		setValue({
			email: email,
			name: name,
			password: ''
		})
	}
	
    return (
		<form className={profileStyles.userInfo} onSubmit={handleSubmit} onReset={handleCancel}>
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
		</form>
	)
}