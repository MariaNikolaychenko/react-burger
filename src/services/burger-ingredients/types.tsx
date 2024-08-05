import { TIngredient } from "../../utils/types";
import { INGREDIENTS_ERROR, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOADING } from "../constants";


export type TIngredientState = {
	ingredients: TIngredient[],
	loading: boolean,
    error: string | null
}

export interface IIngredientsLoadingAction {
	readonly type: typeof INGREDIENTS_LOADING;
};

export interface IIngredientsLoadSuccessAction {
	readonly type: typeof INGREDIENTS_LOAD_SUCCESS;
	readonly payload: TIngredient[];
};

export interface IIngredientsErrorAction {
	readonly type: typeof INGREDIENTS_ERROR;
	readonly payload: string;
};

export type TIngredientsAction = 
	IIngredientsLoadingAction |
	IIngredientsLoadSuccessAction |
	IIngredientsErrorAction