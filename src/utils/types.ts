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


export type TAuthContext = {
	user: TUser | null;
	getUser: () => Promise<any>;
	signIn: (form: any) => Promise<any>,
	signOut: () => Promise<any>,
	register: (form: any) => Promise<any>,
	updateUser: (form: any) => Promise<any>,
	refreshNewToken: () => Promise<any>,
	error: string | null,
	loading: boolean | null
}