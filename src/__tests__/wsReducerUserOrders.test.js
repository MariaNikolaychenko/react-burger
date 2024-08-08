import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE } from "../services/constants";
import { initialState, wsReducer as reducer} from "../services/ws/wsReducerUserOrders";

const orderTest = {
	ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0948"],
    _id: '667d9a0d856777001bb1e4ac',
    status: 'done',
    name: 'Флюоресцентный минеральный альфа-сахаридный бургер',
    number: '44490',
    createdAt: '2024-06-27T16:57:49.105Z',
    updatedAt: '2024-06-27T16:57:49.105Z'    
};

const messageTest = {
	orders: [orderTest],
	total: '1234',
	totalToday: '123'
}


describe('wsReducer for user orders', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	});

	it('should handle WS_USER_CONNECTION_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: WS_USER_CONNECTION_SUCCESS
			})
		).toEqual(
			{
				...initialState,
				wsConnected: true
			}
		);
	});

	it('should handle WS_USER_CONNECTION_ERROR', () => {
		expect(
			reducer(initialState, {
				type: WS_USER_CONNECTION_ERROR,
				payload: 'error'
			})
		).toEqual(
			{
				...initialState,
				error: 'error'
			}
		);
	});

	it('should handle WS_USER_CONNECTION_CLOSED', () => {
		expect(
			reducer(initialState, {
				type: WS_USER_CONNECTION_CLOSED
			})
		).toEqual(
			{
				...initialState
			}
		);
	});

	it('should handle WS_USER_GET_MESSAGE', () => {
		expect(
			reducer(initialState, {
				type: WS_USER_GET_MESSAGE,
				payload: messageTest
			})
		).toEqual(
			{
				...initialState,
				messages: messageTest
			}
		);
	});
});