import { ADD_INGREDIENT, ADD_INGREDIENT_BUN, DELETE_INGREDIENT, SORT_INGREDIENTS, CLEAR_CONSTRUCTOR } from '../constants';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

export type TBurgerConstructorState = {
	bun: TIngredient | null,
	fillings: Array<TConstructorIngredient>
}

export interface IAddIngredientBunAction {
	readonly data: TIngredient;
	readonly type: typeof ADD_INGREDIENT_BUN;
};

export interface IAddIngredientAction {
	readonly type: typeof ADD_INGREDIENT;
	readonly data: TIngredient;
};

export interface IDeleteIngredientAction {
	readonly id: string | number;
	readonly type: typeof DELETE_INGREDIENT;
};

export interface ISortIngredientAction {
	readonly type: typeof SORT_INGREDIENTS;
	readonly hoverIndex: number;
	readonly dragIndex: number;
};

export interface IClearConstructorAction {
	readonly type: typeof CLEAR_CONSTRUCTOR;
	readonly bun: TIngredient;
};

export type TBurgerConstructorActions = 
	IAddIngredientBunAction |
	IAddIngredientAction |
	IDeleteIngredientAction |
	ISortIngredientAction |
	IClearConstructorAction;