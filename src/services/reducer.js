import { combineReducers } from 'redux';

import { reducer as burgerIngredients } from './burger-ingredients/reducer';
import { reducer as burgerConstructor } from './burger-constructor/reducer';
import { reducer as orderData } from './order/reducer';
import { reducer as currentIngredient } from './ingredient/reducer';
import { reducer as user } from './auth/reducer';

export const reducer = combineReducers({
	ingredients: burgerIngredients,
	burgerConstructor: burgerConstructor,
	orderData: orderData,
	currentIngredient: currentIngredient,
	user: user
});