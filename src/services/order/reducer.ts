import {
	NEW_ORDER_LOADING,
	NEW_ORDER_SUCCESS,
	NEW_ORDER_FAILED
} from '../constants'
import { TOrderActions, TOrderState } from './types';

const initialState = {
	isOrderLoading: false,
	isOrderSuccess: false,
	isOrderFailed: false,
	order: null,
	orderName: '',
	orderNumber: null
};

export const reducer = (state: TOrderState = initialState, action: TOrderActions) => {
	switch (action.type) {
		case NEW_ORDER_LOADING: {
			return {
				...state,
				isOrderLoading: true,
				isOrderSuccess: false,
				isOrderFailed: false,
			}
		}
		case NEW_ORDER_SUCCESS: {
			return {
				...state,
				isOrderLoading: false,
				isOrderSuccess: true,
				isOrderFailed: false,
				order: action.order
				// orderName: action.order.name,
				// orderNumber: action.order.number
			};
		}
		case NEW_ORDER_FAILED: {
			return {
				...state,
				isOrderLoading: false,
				isOrderSuccess: false,
				isOrderFailed: true,
			};
		}
		default: {
			return state;
		}
	}
};