import { 
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILED,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILED
} from './actions';

import { TAuthActions, TAuthState } from './types';

const initialState = {
	isForgotSuccess: false,
	isForgotFailed: null,

	isResetPasswordSuccess: false,
	isResetPasswordFailed: null
};

export const reducer = ( state: TAuthState = initialState, action: TAuthActions) => {
	switch (action.type) {
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				isForgotSuccess: true,
				isForgotFailed: false
			};
		case FORGOT_PASSWORD_FAILED:
			return {
				...state,
				isForgotSuccess: false,
				isForgotFailed: true
			}
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isResetPasswordSuccess: true,
				isResetPasswordFailed: false
			};
		case RESET_PASSWORD_FAILED:
			return {
				...state,
				isResetPasswordSuccess: false,
				isResetPasswordFailed: true
			}
		default:
			return state;
	}
}