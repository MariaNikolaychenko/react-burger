import { TUser } from "../../utils/types";
import { 
	REGISTER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_FAILED,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED,
	GET_USER_DATA_LOADING,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILED,
	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_FAILED
} from "../constants";

export type TAuthState = TUser & {
	isLoginLoading: boolean,
	isLoginSuccess: boolean,
	isLoginFailed:  boolean | null,
	isLogoutSuccess: boolean,
	isLogoutFailed:  boolean | null,
	isRefreshTokenSuccess: boolean,
	isRefreshTokenFailed:  boolean | null,
	isRegisterSuccess: boolean,
	isRegisterFailed:  boolean | null,
	isGetUserLoading: boolean,
	isGetUserSuccess: boolean,
	isGetUserFailed:  boolean | null,
	isUpdateUserSuccess: boolean,
	isUpdateUserFailed:  boolean | null,
	isForgotSuccess: boolean,
	isForgotFailed: boolean | null,
	isResetPasswordSuccess: boolean,
	isResetPasswordFailed: boolean | null
};

export interface IRegisterLoadingAction {
	readonly type: typeof REGISTER_LOADING;
};
export interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS;
};
export interface IRegisterFailedAction {
	readonly type: typeof REGISTER_FAILED;
};
export interface ILoginAction {
	readonly type: typeof LOGIN;
};
export interface ILoginSuccessAction {
	readonly user: TUser;
	readonly type: typeof LOGIN_SUCCESS;
};
export interface ILoginFailedAction {
	readonly type: typeof LOGIN_FAILED;
};
export interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS;
};
export interface ILogoutFailedAction {
	readonly type: typeof LOGOUT_FAILED;
};
export interface IRefreshTokenSuccessAction {
	readonly type: typeof REFRESH_TOKEN_SUCCESS;
};
export interface IRefreshTokenFailedAction {
	readonly type: typeof REFRESH_TOKEN_FAILED;
};
export interface IGetUserDataLoadingAction {
	readonly type: typeof GET_USER_DATA_LOADING;
};
export interface IGetUserDataSuccessAction {
	readonly user: TUser;
	readonly type: typeof GET_USER_DATA_SUCCESS;
};
export interface IGetUserDataFailedAction {
	readonly type: typeof GET_USER_DATA_FAILED;
};
export interface IUpdateUserDataSuccessAction {
	readonly user: TUser;
	readonly type: typeof UPDATE_USER_DATA_SUCCESS;
};
export interface IUpdateUserDataFailedAction {
	readonly type: typeof UPDATE_USER_DATA_FAILED;
};
export interface IForgotPasswordSuccessAction {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};
export interface IForgotPasswordFailedAction {
	readonly type: typeof FORGOT_PASSWORD_FAILED;
};
export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
};
export interface IResetPasswordFailedAction {
	readonly type: typeof RESET_PASSWORD_FAILED;
};

export type TAuthActions =
	IRegisterLoadingAction |
	IRegisterSuccessAction |
	IRegisterFailedAction |
	ILoginAction |
	ILoginSuccessAction |
	ILoginFailedAction |
	ILogoutSuccessAction |
	ILogoutFailedAction |
	IRefreshTokenSuccessAction |
	IRefreshTokenFailedAction |
	IGetUserDataLoadingAction |
	IGetUserDataSuccessAction |
	IGetUserDataFailedAction |
	IUpdateUserDataSuccessAction |
	IUpdateUserDataFailedAction |
	IForgotPasswordSuccessAction |
	IForgotPasswordFailedAction |
	IResetPasswordSuccessAction |
	IResetPasswordFailedAction;