import { 
	REGISTER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_FAILED,
	FORGOT_PASSWORD,
	FORGOT_FAILED,
	GET_USER_DATA_LOADING,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILED,
	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_FAILED
} from './actions';

const initialState = {
	email: '',
	name: '',

	isLoginSuccess: false,
	isLoginFailed: null,

	isLogoutSuccess: false,
	isLogoutFailed: null,

	isRefreshTokenSuccess: false,
	isRefreshTokenFailed: null,

	isRegisterSuccess: false,
	isRegisterFailed: null,

	isGetUserLoading: false,
	isGetUserSuccess: false,
	isGetUserFailed: null,

	isUpdateUserSuccess: false,
	isUpdateUserFailed: null,

	isForgotSuccess: false,
	isForgotFailed: null
};

export const reducer = ( state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case REGISTER_LOADING:
			return {
				...state,
				isRegisterSuccess: false,
				isRegisterFailed: false
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isRegisterSuccess: true,
				isRegisterFailed: false
			};
		case REGISTER_FAILED:
			return {
				...state,
				isRegisterSuccess: false,
				isRegisterFailed: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				name: action.user.name,
				email: action.user.email,
				isLoginSuccess: true,
				isLoginFailed: false
			};
		case LOGIN_FAILED:
			return {
				...state,
				isLoginSuccess: false,
				isLoginFailed: true
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isLogoutSuccess: true,
				isLogoutFailed: false
			};
		case LOGOUT_FAILED:
			return {
				...state,
				isLogoutSuccess: false,
				isLogoutFailed: true
			};
		case REFRESH_TOKEN_SUCCESS:
			return {
				...state,
				isRefreshTokenSuccess: true,
				isRefreshTokenFailed: false
			};
		case REFRESH_TOKEN_FAILED:
			return {
				...state,
				isRefreshTokenSuccess: false,
				isRefreshTokenFailed: true
			};
		case GET_USER_DATA_LOADING:
			return {
				...state,
				isGetDataLoading: true
			};
		case GET_USER_DATA_SUCCESS:
			return {
				...state,
				name: action.user.name,
				email: action.user.email,
				isGetDataLoading: false,
				isGetUserSuccess: true
			};
		case GET_USER_DATA_FAILED:
			return {
				...state,
				isGetDataLoading: false,
				isGetUserFailed: true
			};
		case UPDATE_USER_DATA_SUCCESS:
			return {
				...state,
				name: action.user.name,
				email: action.user.email,
				isUpdateUserSuccess: true,
				isUpdateUserFailed: false
			};
		case UPDATE_USER_DATA_FAILED:
			return {
				...state,
				isUpdateUserSuccess: false,
				isUpdateUserFailed: true
			};
		case FORGOT_PASSWORD:
			return {
				...state,
				isForgotSuccess: true,
				isForgotFailed: false
			};
		case FORGOT_FAILED:
			return {
				...state,
				isForgotSuccess: false,
				isForgotFailed: true
			}
		default:
			return state;
	}
}