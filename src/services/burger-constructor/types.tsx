import { ADD_INGREDIENT, ADD_INGREDIENT_BUN, DELETE_INGREDIENT, SORT_INGREDIENTS } from './actions'
import { CLEAR_CONSTRUCTOR } from '../order/actions'
import { TConstructorIngredient, TIngredient } from '../../utils/types'

export type TBurgerConstructorState = {
	bun: TIngredient | null,
	fillings: Array<TConstructorIngredient>
}

export interface IAddIngredientBunAction {
	data: TIngredient;
	type: typeof ADD_INGREDIENT_BUN;
};

export interface IAddIngredientAction {
	type: typeof ADD_INGREDIENT;
	data: TIngredient;
};

export interface IDeleteIngredientAction {
	id: string | number;
	type: typeof DELETE_INGREDIENT;
};

export interface ISortIngredientAction {
	type: typeof SORT_INGREDIENTS;
	hoverIndex: number;
	dragIndex: number;
};

export interface IClearConstructorAction {
	type: typeof CLEAR_CONSTRUCTOR;
	bun: TIngredient;
};

export type TBurgerConstructorActions = 
	IAddIngredientBunAction |
	IAddIngredientAction |
	IDeleteIngredientAction |
	ISortIngredientAction |
	IClearConstructorAction;