import {
	NEW_ORDER_LOADING,
	NEW_ORDER_SUCCESS,
	NEW_ORDER_FAILED,
	GET_ORDER_BY_NUMBER_FAILED,
	GET_ORDER_BY_NUMBER_SUCCESS,
	GET_ORDER_BY_NUMBER_LOADING,
} from '../constants'
import { TOrderActions, TOrderState } from './types';

export const initialState = {
	isOrderLoading: false,
	isOrderSuccess: false,
	isOrderFailed: false,
	isGetOrderByNumberLoading: false,
	isGetOrderByNumberSuccess: false,
	isGetOrderByNumberFailed: false,
	order: null,
	orderName: '',
	orderNumber: null,
	currentOrder: null
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
		case GET_ORDER_BY_NUMBER_LOADING: {
			return {
			  ...state,
			  isGetOrderByNumberLoading: true,
			  isGetOrderByNumberFailed: false
			}
		  }
		  case  GET_ORDER_BY_NUMBER_SUCCESS: {
			return {
			  ...state,
			  currentOrder: action.payload,
			  isGetOrderByNumberLoading: false
			}
		  }
		  case GET_ORDER_BY_NUMBER_FAILED: {
			return {
			  ...state,
			  isGetOrderByNumberLoading: false,
			  isGetOrderByNumberSuccess: false,
			  isGetOrderByNumberFailed: true
			}
		  }
		default: {
			return state;
		}
	}
};