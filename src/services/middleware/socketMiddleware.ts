import type { Middleware, MiddlewareAPI } from 'redux';

import { getCurrentTimestamp } from '../../utils/datetime';
import { AppActions, AppDispatch, IMessage, RootState, TWSStoreActions } from '../types';
import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: AppActions) => {
			const { dispatch, getState } = store;
			const { type } = action;
			const { 
				wsInit, 
				wsSendMessage, 
				onOpen, 
				onClose, 
				onError, 
				onMessage 
			} = wsActions;

			const { name } = getState().user;
			
			if (type === wsInit && name ) {
				//socket = new WebSocket(`${wsUrl}?token=${token}`);
				socket = new WebSocket(`${wsUrl}/all`);
			}
			if (socket) {
				socket.onopen = event => {
					// @ts-ignore
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					// @ts-ignore
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData: IMessage = JSON.parse(data);
					
					// @ts-ignore
					dispatch({ type: onMessage, payload: parsedData });
				};

				socket.onclose = event => {
					// @ts-ignore
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const payload = action.payload;
					//const message = { ...(payload as IMessage), token: getCookie('token') };
					const message = { ...(payload), token: getCookie('token') };
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};