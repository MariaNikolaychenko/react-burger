import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

//import {rootReducer} from './services/reducers/index';
//import { compose, createStore, applyMiddleware } from 'redux';
//import { compose, createStore } from 'redux';
//import { createStore } from 'redux';
import { Provider } from "react-redux";
import { configureStore } from './services/store';

/*declare global {
  interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers();

const store = createStore(rootReducer, enhancer);*/

//const store = createStore(configureStore);

const store = configureStore({
  ingredients: {
    ingredients: []
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
