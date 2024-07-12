import { TIngredient } from "../../utils/types";
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "./actions";

export type TCurrentIngredientState = {
	currentIngredient: TIngredient | null
}

export interface ISetCurrentIngredientAction {
	type: typeof SET_CURRENT_INGREDIENT;
	data: TIngredient
};

export interface IDeleteCurrentIngredientAction {
	type: typeof DELETE_CURRENT_INGREDIENT;
};

export type TCurrentIngredientActions = 
	ISetCurrentIngredientAction |
	IDeleteCurrentIngredientAction;