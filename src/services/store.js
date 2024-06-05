import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import { thunk } from 'redux-thunk'

export const configureStore = ( initialState ) => {
	const store = createStore(
		reducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk))
	);

	return store;
}