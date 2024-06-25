import React, { useState, useEffect } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from '../../components/preloader/preloader';

import { useDispatch, useSelector } from "react-redux";
import { 
	getUserDataAction,
	updateUserDataAction
} from "../../services/auth/actions";
import { getAuthInfo } from "../../services/auth/selectors"

import styles from '../index.module.css';

export const UserProfile = () => {
	const [ isDataChanged, setIsDataChanged ] = useState(false);
	
	const dispatch = useDispatch();
	
	const [userData, setUserData] = useState(
		{
			name: '',
			email: '',
			password: '',
		}
	)

	const { name, email, isGetUserLoading } = useSelector(getAuthInfo);
	
	useEffect(() => {
		setUserData(prevState => ({
			...prevState,
			name: name,
			email: email
		}))
	}, [name, email])

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(updateUserDataAction(userData));
	}
	
	const handleChange = (e) => {
		setIsDataChanged(true);
		const {name, value} = e.target;
		setUserData(prevState => ({
			...prevState, 
			[name]: value
		}));
	}
	
	const handleCancel = () => {
		setIsDataChanged(false);
	}
	useEffect(()=>{
		dispatch(getUserDataAction())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	if (isGetUserLoading || name === "") 
		return <Preloader />;

    return (
		<form onSubmit={handleSubmit} onReset={handleCancel}>
			<Input 
				name="name" 
				placeholder="Имя" 
				value={userData.name}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			<EmailInput 
				extraClass="mt-6" 
				name="email" 
				value={userData.email}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			<PasswordInput 
				extraClass="mt-6" 
				placeholder="Новый пароль"
				name="password" 
				value={userData.password}
				onChange={handleChange} 
				icon="EditIcon" 
			/>
			{isDataChanged && 
				<div className={styles.formFooter}>
					<Button 
						type="primary" 
						htmlType='reset'
						onClick={handleCancel}
					>
						Отмена
					</Button>
					<Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
				</div>
			}
		</form>
    )
}