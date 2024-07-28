export type TIngredientType = "bun" | "main" | "sauce";

export type TIngredient = {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TConstructorInitialState = {
	bun: TIngredient | null;
	ingredients: Array<TConstructorIngredient>;
}

export type TConstructorIngredient = TIngredient & { uuid: string }; 

export type TUser = {
	name: string;
	email: string
}

export type TRegister = TUser & {
	password: string;
}
export type TLogin = Omit<TRegister, 'name'>;
export type TUserName = Omit<TUser, 'email'>;
export type TUserEmail = Omit<TUser, 'name'>;

type TToken = {
	accessToken: string,
	refreshToken: string,
}

export type TForgotPassword = Omit<TUser, 'name'>;

export type TResetPassword = {
	password: string;
	token: string;
}

type TResponseSuccess = {
	success: boolean
}
export type TResponseIngredients = TResponseSuccess & { data: TIngredient }
export type TResponseUser = TResponseSuccess & { user: TUser };
export type TResponseLogin = TResponseSuccess & { user: TUser } & TToken;
export type TResponseLogout = TResponseSuccess & { message: string };
export type TResponseToken = TResponseSuccess & TToken;