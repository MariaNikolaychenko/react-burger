import {
	forgotPasswordApi,
	getUserDataApi,
	loginApi,
	logoutApi,
	refreshTokenApi,
	registerApi,
	resetPasswordApi,
	updateUserDataApi
} from "../../utils/api";
import { TLogin, TRegister, TResetPassword } from "../../utils/types";
import { AppDispatch } from "../types";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import {
	REGISTER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	GET_USER_DATA_LOADING,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILED,
	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_FAILED,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_FAILED,
	FORGOT_PASSWORD_FAILED, 
	FORGOT_PASSWORD_SUCCESS, 
	RESET_PASSWORD_FAILED, 
	RESET_PASSWORD_SUCCESS 
} from "../constants";
import { isTokenExpired } from "../../utils/token";


export const registerAction = (data: TRegister) => (dispatch: AppDispatch) => {
	dispatch({ type: REGISTER_LOADING });

	registerApi(data)
		.then((res: any) => {
			if (res && res.success) {
				let authToken;
				if (res.accessToken.startsWith("Bearer ")){
					authToken = res.accessToken.split('Bearer ')[1];
					
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}

				dispatch({
					type: REGISTER_SUCCESS,
					user: res.user,
				});

			} else {
				dispatch({
					type: REGISTER_FAILED,
				});
			}
		})
		.catch((err: string) => {
			dispatch({
			  	type: REGISTER_FAILED,
			});
		});
	
}


export const loginAction = (data: TLogin) => (dispatch: AppDispatch) => {
	dispatch({ type: LOGIN});

	loginApi(data)
		.then((res: any) => {
			if (res && res.success) {
				if (res.accessToken.startsWith("Bearer ")){
					const authToken = res.accessToken.split('Bearer ')[1];
		
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}
				dispatch({
					type: LOGIN_SUCCESS,
					user: res.user,
				});

			} else {
				dispatch({
					type: LOGIN_FAILED
				});
			}
		})
		.catch(console.error);
}

export const logoutAction = () => (dispatch: AppDispatch) => {
	logoutApi()
		.then(res => {
			// @ts-ignore
			if (res && res.success) {
        		deleteCookie('token');
				localStorage.removeItem('refreshToken');
				dispatch({
					type: LOGOUT_SUCCESS
				})
				
			} else {
				dispatch({
					type: LOGOUT_FAILED
				});
			}
		})
		.catch(console.error);
}

export const refreshTokenAction = () => (dispatch: AppDispatch) => {
	refreshTokenApi()
	.then((res: any) => {
		if (res && res.success) {
			if (res.accessToken.startsWith("Bearer ")){
				setCookie('token', res.accessToken.split('Bearer ')[1]);
				localStorage.setItem('refreshToken', res.refreshToken);
			}
			dispatch({
				type: REFRESH_TOKEN_SUCCESS
			});
			dispatch(getUserDataAction());
		} else {
			dispatch({
				type: REFRESH_TOKEN_FAILED
			});
			dispatch(logoutAction());
		}
	})
	.catch(console.error);
}

export const getUserDataAction = () => (dispatch: AppDispatch) => {
	dispatch({ type: GET_USER_DATA_LOADING });
	getUserDataApi()
	.then((res: any) => {
		if (res && res.success) {
			dispatch({
				type: GET_USER_DATA_SUCCESS,
				user: res.user
			})
			
		}
	})
	.catch((error: string) => {
		if (error === 'Ошибка 403') {
			const refreshToken = localStorage.getItem('refreshToken');
			const isExpired = isTokenExpired(getCookie('token'));

			if (refreshToken && isExpired) {
				dispatch(refreshTokenAction());
			} else {
				dispatch({
					type: GET_USER_DATA_FAILED,
				});
			}
		}
	});
}

export const updateUserDataAction = (data: TRegister) => (dispatch: AppDispatch) => {
	updateUserDataApi(data)
		.then((res: any) => {
			if (res && res.success) {
				dispatch({
					type: UPDATE_USER_DATA_SUCCESS,
					user: res.user
				})
				
			} else {
				dispatch({
					type: UPDATE_USER_DATA_FAILED
				});
			}
		})
		.catch(console.error);
}

export const forgotPasswordAction = (email: string) => (dispatch: AppDispatch) => {
	forgotPasswordApi(email)
		.then(res => {
			// @ts-ignore
			if (res && res.success) {
				dispatch({
					type: FORGOT_PASSWORD_SUCCESS
				})
				
			} else {
				dispatch({
					type: FORGOT_PASSWORD_FAILED
				});
			}
		})
		.catch(console.error);
}

export const resetPasswordAction = (form: TResetPassword) => (dispatch: AppDispatch) => {
	resetPasswordApi(form)
		.then(res => {
			// @ts-ignore
			if (res && res.success) {
				dispatch({
					type: RESET_PASSWORD_SUCCESS
				})
				
			} else {
				dispatch({
					type: RESET_PASSWORD_FAILED
				});
			}
		})
		.catch(console.error);
}