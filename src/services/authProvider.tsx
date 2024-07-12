import { useContext, createContext, useState, ReactNode } from "react";
import { getUserDataApi, loginApi, logoutApi, refreshTokenApi, registerApi, updateUserDataApi } from "../utils/api";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { isTokenExpired } from "../utils/token";
import { TAuthContext, TLogin, TRegister, TResponseLogin, TResponseLogout, TResponseToken, TResponseUser, TUser } from "../utils/types";
import { useNavigate } from "react-router-dom";


type TProvideAuth = {
	children?: ReactNode | undefined;
}

const initialValue = {
	user: null,
	getUser: async () => {},
	signIn: async () => {},
	signOut: async () => {},
	register: async () => {},
	updateUser: async () => {},
	refreshNewToken: async () => {},
	error: null,
	loading: null
}

const AuthContext = createContext<TAuthContext>(initialValue);

export function ProvideAuth({ children }: TProvideAuth) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
  
export function useAuth() {
	return useContext(AuthContext);
}
  
export function useProvideAuth():TAuthContext {
	const navigate = useNavigate();
	const [user, setUser] = useState<null | TUser >(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean | null>(null);

	const getUser = async () => {
		setLoading(true);

		const token = localStorage.getItem('refreshToken');
		const isExpired = isTokenExpired(getCookie('token'));
		
		if (token && isExpired) {
			refreshNewToken();
		}
		
		try {
			const res = await getUserDataApi() as TResponseUser;

			if (res && res.success) {
				setUser(res.user);
			}
			setLoading(false);
		} catch(err: any) {
			if (err !== 'Ошибка 403') setError(err);
			setLoading(false);
		}			
	};
  
	const signIn = async (form: TLogin) => {
		setLoading(true);

		try {
			const res = await loginApi(form) as TResponseLogin;

			if (res && res.success) {
				if (res.accessToken.startsWith("Bearer ")){
					const authToken = res.accessToken.split('Bearer ')[1];

					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}
				setUser(res.user);
			}
			setLoading(false);
			
		} catch (err: any) {
			if (err !== 'Ошибка 403') setError(err);
			setLoading(false);
		}
	};
  
	const signOut = async () => {
		try {
			const res = await logoutApi() as TResponseLogout;

			if (res && res.success) {
				setUser(null);
				deleteCookie('token');
				localStorage.removeItem('refreshToken');
				// eslint-disable-next-line no-restricted-globals
				return navigate('/login');
			}
		} catch {
			return false;
		}
	};

	const register = async (form: TRegister) => {
		setLoading(true);

		try {
			const res = await registerApi(form) as TResponseLogin;

			if (res && res.success) {
				if (res.accessToken.startsWith("Bearer ")){
					const authToken = res.accessToken.split('Bearer ')[1];
					
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}
				setUser(res.user);
			}
			setLoading(false);

		}
		catch (err: any) {
			if (err !== 'Ошибка 403') setError(err);
			setLoading(false);
		}
	};

	const updateUser = async (form: TRegister) => {
		try {
			const res = await updateUserDataApi(form) as TResponseUser;
			if (res && res.success) {
				setUser(res.user);
			}
		}
		catch {
			setError("Ошибка при обновлении данных");
		}
	};

	const refreshNewToken = async () => {
		try {
			const res = await refreshTokenApi() as TResponseToken;

			if (res && res.success) {
				if (res.accessToken.startsWith("Bearer ")){
					const authToken = res.accessToken.split('Bearer ')[1];
					
					setCookie('token', authToken);
					localStorage.setItem('refreshToken', res.refreshToken);
				}
			}
		} catch {
			return false;
		}
	};
  
	return {
		user,
		getUser,
		signIn,
		signOut,
		register,
		updateUser,
		refreshNewToken,
		error,
		loading
	};
}