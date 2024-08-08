import { reducer } from "../services/auth/reducer";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, GET_USER_DATA_FAILED, GET_USER_DATA_LOADING, GET_USER_DATA_SUCCESS, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS, REGISTER_FAILED, REGISTER_LOADING, REGISTER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, UPDATE_USER_DATA_FAILED, UPDATE_USER_DATA_SUCCESS } from "../services/constants";

const initialState = {
	email: '',
	name: '',
	isRegisterSuccess: false,
	isRegisterFailed: null,
	isLoginLoading: false,
	isLoginSuccess: false,
	isLoginFailed: null,
	isLogoutSuccess: false,
	isLogoutFailed: null,
	isRefreshTokenSuccess: false,
	isRefreshTokenFailed: null,
	isGetUserLoading: false,
	isGetUserSuccess: false,
	isGetUserFailed: null,
	isUpdateUserSuccess: false,
	isUpdateUserFailed: null,
	isForgotSuccess: false,
	isForgotFailed: null,
	isResetPasswordSuccess: false,
	isResetPasswordFailed: null
};

const userTest = {
	name: 'Test User',
	email: 'test-user@yandex.ru'
}

describe('auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	});

	it('should handle REGISTER_LOADING', () => {
		expect(
			reducer(initialState, {
				type: REGISTER_LOADING
			})
		).toEqual(
			{
				...initialState,
				isRegisterFailed: false
			}
		)
	});

	it('should handle REGISTER_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: REGISTER_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				isRegisterSuccess: true,
				isRegisterFailed: false
			}
		)
	});

	it('should handle REGISTER_FAILED', () => {
		expect(
			reducer(initialState, {
				type: REGISTER_FAILED
			})
		).toEqual(
			{
				...initialState,
				isRegisterSuccess: false,
				isRegisterFailed: true
			}
		)
	});

	it('should handle LOGIN', () => {
		expect(
			reducer(initialState, {
				type: LOGIN
			})
		).toEqual(
			{
				...initialState,
				isLoginLoading: true,
				isLoginSuccess: false,
				isLoginFailed: false
			}
		)
	});

	it('should handle LOGIN_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: LOGIN_SUCCESS,
				user: userTest
			})
		).toEqual(
			{
				...initialState,
				name: userTest.name,
				email: userTest.email,
				isLoginLoading: false,
				isLoginSuccess: true,
				isLoginFailed: false
			}
		)
	});

	it('should handle LOGIN_FAILED', () => {
		expect(
			reducer(initialState, {
				type: LOGIN_FAILED
			})
		).toEqual(
			{
				...initialState,
				isLoginLoading: false,
				isLoginSuccess: false,
				isLoginFailed: true
			}
		)
	});

	it('should handle LOGOUT_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: LOGOUT_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				name: '',
				email: '',
				isLogoutSuccess: true,
				isLogoutFailed: false
			}
		)
	});

	it('should handle LOGOUT_FAILED', () => {
		expect(
			reducer(initialState, {
				type: LOGOUT_FAILED
			})
		).toEqual(
			{
				...initialState,
				isLogoutSuccess: false,
				isLogoutFailed: true
			}
		)
	});

	it('should handle REFRESH_TOKEN_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: REFRESH_TOKEN_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				isRefreshTokenSuccess: true,
				isRefreshTokenFailed: false
			}
		)
	});

	it('should handle REFRESH_TOKEN_FAILED', () => {
		expect(
			reducer(initialState, {
				type: REFRESH_TOKEN_FAILED
			})
		).toEqual(
			{
				...initialState,
				isRefreshTokenSuccess: false,
				isRefreshTokenFailed: true
			}
		)
	});

	it('should handle GET_USER_DATA_LOADING', () => {
		expect(
			reducer(initialState, {
				type: GET_USER_DATA_LOADING
			})
		).toEqual(
			{
				...initialState,
				isGetDataLoading: true
			}
		)
	});

	it('should handle GET_USER_DATA_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: GET_USER_DATA_SUCCESS,
				user: userTest
			})
		).toEqual(
			{
				...initialState,
				name: userTest.name,
				email: userTest.email,
				isGetDataLoading: false,
				isGetUserSuccess: true
			}
		)
	});

	it('should handle GET_USER_DATA_FAILED', () => {
		expect(
			reducer(initialState, {
				type: GET_USER_DATA_FAILED
			})
		).toEqual(
			{
				...initialState,
				isGetDataLoading: false,
				isGetUserFailed: true
			}
		)
	});

	it('should handle UPDATE_USER_DATA_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: UPDATE_USER_DATA_SUCCESS,
				user: userTest
			})
		).toEqual(
			{
				...initialState,
				name: userTest.name,
				email: userTest.email,
				isUpdateUserSuccess: true,
				isUpdateUserFailed: false
			}
		)
	});

	it('should handle UPDATE_USER_DATA_FAILED', () => {
		expect(
			reducer(initialState, {
				type: UPDATE_USER_DATA_FAILED
			})
		).toEqual(
			{
				...initialState,
				isUpdateUserSuccess: false,
				isUpdateUserFailed: true
			}
		)
	});

	it('should handle FORGOT_PASSWORD_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: FORGOT_PASSWORD_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				isForgotSuccess: true,
				isForgotFailed: false
			}
		)
	});

	it('should handle FORGOT_PASSWORD_FAILED', () => {
		expect(
			reducer(initialState, {
				type: FORGOT_PASSWORD_FAILED
			})
		).toEqual(
			{
				...initialState,
				isForgotSuccess: false,
				isForgotFailed: true
			}
		)
	});

	it('should handle RESET_PASSWORD_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: RESET_PASSWORD_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				isResetPasswordSuccess: true,
				isResetPasswordFailed: false
			}
		)
	});

	it('should handle RESET_PASSWORD_FAILED', () => {
		expect(
			reducer(initialState, {
				type: RESET_PASSWORD_FAILED
			})
		).toEqual(
			{
				...initialState,
				isResetPasswordSuccess: false,
				isResetPasswordFailed: true
			}
		)
	});
});