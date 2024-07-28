import { TIngredient } from "../../utils/types";
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../constants";

export type TCurrentIngredientState = {
	currentIngredient: TIngredient | null
}

export interface ISetCurrentIngredientAction {
	readonly type: typeof SET_CURRENT_INGREDIENT;
	readonly data: TIngredient
};

export interface IDeleteCurrentIngredientAction {
	readonly type: typeof DELETE_CURRENT_INGREDIENT;
};

export type TCurrentIngredientActions = 
	ISetCurrentIngredientAction |
	IDeleteCurrentIngredientAction;