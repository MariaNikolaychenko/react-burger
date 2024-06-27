import {
	forgotPasswordApi,
	resetPasswordApi
} from "../../utils/api";

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_PASSWORD';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


export const forgotPasswordAction = (email) => (dispatch) => {
	forgotPasswordApi(email)
		.then(res => {
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

export const resetPasswordAction = (form) => (dispatch) => {

	resetPasswordApi(form)
		.then(res => {
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