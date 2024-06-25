import { 
	registerApi,
	loginApi,
	logoutApi,
	refreshTokenApi,
	getUserDataApi,
	updateUserDataApi,
	forgotPasswordApi
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_DATA_LOADING = 'GET_USER_DATA_LOADING';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const registerAction = (data) => (dispatch) => {
	dispatch({ type: REGISTER_LOADING });

	registerApi(data)
		.then(res => {
			if (res && res.success) {
				let authToken;
				if (res.accessToken.startsWith("Bearer ")){
					authToken = res.accessToken.split('Bearer ')[1];
				}

				if (authToken) {
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
		.catch(console.error);
	
}

export const loginAction = (data) => (dispatch) => {
	loginApi(data)
		.then(res => {
			if (res && res.success) {
				let authToken;
				if (res.accessToken.startsWith("Bearer ")){
					authToken = res.accessToken.split('Bearer ')[1];
				}

				if (authToken) {
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

export const logoutAction = () => (dispatch) => {
	logoutApi()
		.then(res => {
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

export const refreshTokenAction = () => (dispatch) => {
	refreshTokenApi()
		.then(res => {
			if (res && res.success) {
				let authToken;
				if (res.accessToken.startsWith("Bearer ")){
					authToken = res.accessToken.split('Bearer ')[1];
				}

				if (authToken) {
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}
				dispatch({
					type: REFRESH_TOKEN_SUCCESS,
					user: res.user,
				})
			} else {
				dispatch({
					type: REFRESH_TOKEN_FAILED
				});
			}
		})
		.catch(console.error);
}

export const getUserDataAction = () => (dispatch) => {
	dispatch({ type: GET_USER_DATA_LOADING });

	getUserDataApi()
		.then(res => {
			if (res && res.success) {
				dispatch({
					type: GET_USER_DATA_SUCCESS,
					user: res.user
				})
				
			} else {
				dispatch({
					type: GET_USER_DATA_FAILED
				});
			}
		})
		.catch(console.error);
}

export const updateUserDataAction = (data) => (dispatch) => {
	updateUserDataApi(data)
		.then(res => {
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

export const forgotPasswordAction = (email) => (dispatch) => {
	dispatch({ type: FORGOT_PASSWORD });

	forgotPasswordApi(email)
		.then(res => {
			if (res && res.success) {
				dispatch({
					type: FORGOT_PASSWORD
				})
				
			} else {
				dispatch({
					type: FORGOT_FAILED
				});
			}
		})
		.catch(console.error);
}