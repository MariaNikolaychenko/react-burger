import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS } from "./actions";

export type TAuthState = {
	isForgotSuccess: boolean,
	isForgotFailed: boolean | null,
	isResetPasswordSuccess: boolean,
	isResetPasswordFailed: boolean | null
};

export interface IForgotPasswordSuccessAction {
	type: typeof FORGOT_PASSWORD_SUCCESS;
};

export interface IForgotPasswordFailedAction {
	type: typeof FORGOT_PASSWORD_FAILED;
};

export interface IResetPasswordSuccessAction {
	type: typeof RESET_PASSWORD_SUCCESS;
};

export interface IResetPasswordFailedAction {
	type: typeof RESET_PASSWORD_FAILED;
};

export type TAuthActions =
	IForgotPasswordSuccessAction |
	IForgotPasswordFailedAction |
	IResetPasswordSuccessAction |
	IResetPasswordFailedAction;