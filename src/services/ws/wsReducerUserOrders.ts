import {
	WS_USER_CONNECTION_SUCCESS,
	WS_USER_CONNECTION_ERROR,
	WS_USER_CONNECTION_CLOSED,
	WS_USER_GET_MESSAGE
} from '../constants';
import type { IMessage, TWSActions } from '../types';

type TWSState = {
	wsConnected: boolean;
	messages: IMessage[];

	error?: Event;
}

const initialState: TWSState = {
	wsConnected: false,
	messages: []
};

export const wsReducer = (state = initialState, action: TWSActions) => {
	switch (action.type) {
		case WS_USER_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true
			};

		case WS_USER_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false
			};

		case WS_USER_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false
			};

		case WS_USER_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				messages: action.payload
			};

		default:
			return state;
	}
};