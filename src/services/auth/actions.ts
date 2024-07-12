import {
	forgotPasswordApi,
	resetPasswordApi
} from "../../utils/api";
import { TResetPassword } from "../../utils/types";
import { AppDispatch } from "../store";

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_PASSWORD';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


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