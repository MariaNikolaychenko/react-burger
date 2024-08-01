import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./reducer";
import { socketMiddleware } from './middleware/socketMiddleware';

import { thunk } from 'redux-thunk';
import { 
	WS_CONNECTION_CLOSED, 
	WS_CONNECTION_ERROR, 
	WS_CONNECTION_START, 
	WS_CONNECTION_USER_START, 
	WS_CONNECTION_SUCCESS, 
	WS_GET_MESSAGE, 
	WS_SEND_MESSAGE 
} from "./constants";
import { TWSStoreActions } from "./types";

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWSStoreActions = {
	wsInit: WS_CONNECTION_START,
	wsInitUser: WS_CONNECTION_USER_START,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE
};

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, {}, enhancer);