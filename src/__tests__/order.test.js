import { reducer } from "../services/order/reducer";
import { GET_ORDER_BY_NUMBER_FAILED, GET_ORDER_BY_NUMBER_LOADING, GET_ORDER_BY_NUMBER_SUCCESS, NEW_ORDER_FAILED, NEW_ORDER_LOADING, NEW_ORDER_SUCCESS } from "../services/constants";

const initialState = {
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

const orderTest = {
	ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0948"],
    _id: '667d9a0d856777001bb1e4ac',
    status: 'done',
    name: 'Флюоресцентный минеральный альфа-сахаридный бургер',
    number: '44490',
    createdAt: '2024-06-27T16:57:49.105Z',
    updatedAt: '2024-06-27T16:57:49.105Z'    
};

const shortOrderTest = {
	name: 'Краторный бургер',
	number: '12345'
}

describe('order reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(initialState, {})).toEqual(
			initialState
		)
	});

	it('should handle NEW_ORDER_LOADING', () => {
		expect(
			reducer(initialState, {
				type: NEW_ORDER_LOADING
			})
		).toEqual(
			{
				...initialState,
				isOrderLoading: true
			}
		);
	});

	it('should handle NEW_ORDER_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: NEW_ORDER_SUCCESS,
				order: shortOrderTest
			})
		).toEqual(
			{
				...initialState,
				isOrderSuccess: true,
				order: shortOrderTest
			}
		);
	});

	it('should handle NEW_ORDER_FAILED', () => {
		expect(
			reducer(initialState, {
				type: NEW_ORDER_FAILED
			})
		).toEqual(
			{
				...initialState,
				isOrderFailed: true
			}
		);
	});

	it('should handle GET_ORDER_BY_NUMBER_LOADING', () => {
		expect(
			reducer(initialState, {
				type: GET_ORDER_BY_NUMBER_LOADING
			})
		).toEqual(
			{
				...initialState,
				isGetOrderByNumberLoading: true
			}
		);
	});

	it('should handle GET_ORDER_BY_NUMBER_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: GET_ORDER_BY_NUMBER_SUCCESS,
				payload: orderTest
			})
		).toEqual(
			{
				...initialState,
				currentOrder: orderTest
			}
		);
	});

	it('should handle GET_ORDER_BY_NUMBER_FAILED', () => {
		expect(
			reducer(initialState, {
				type: GET_ORDER_BY_NUMBER_FAILED
			})
		).toEqual(
			{
				...initialState,
				isGetOrderByNumberFailed: true
			}
		);
	});
});