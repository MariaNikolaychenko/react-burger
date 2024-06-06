import {
	NEW_ORDER_REQUEST,
	NEW_ORDER_SUCCESS,
	NEW_ORDER_FAILED,
} from '../order/actions'

const initialState = {
	isOrderRequest: false,
	isOrderFailed: false,
	orderName: '',
	orderNumber: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_ORDER_REQUEST: {
			return {
			...state,
			isOrderRequest: true,
			isOrderFailed: false,
			}
		}
		case NEW_ORDER_SUCCESS: {
			return {
			...state,
			isOrderRequest: false,
			isOrderFailed: false,
			orderName: action.order.name,
			orderNumber: action.order.order.number
			};
		}
		case NEW_ORDER_FAILED: {
			return {
			...state,
			isOrderRequest: false,
			isOrderFailed: true,
			};
		}
		default: {
			return state;
		}
	}
};