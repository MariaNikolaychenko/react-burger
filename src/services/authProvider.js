import { useContext, createContext, useState } from "react";
import { getUserDataApi, loginApi, logoutApi, refreshTokenApi, registerApi, updateUserDataApi } from "../utils/api";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { isTokenExpired } from "../utils/token";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
  
export function useAuth() {
	return useContext(AuthContext);
}
  
export function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const getUser = async () => {
		setLoading(true);
		const token = localStorage.getItem('refreshToken');
		const isExpired = isTokenExpired(getCookie('token'));
		if (token && isExpired) {
			refreshNewToken();
		}

		return await getUserDataApi()
			.then(res => {
				if (res.success) {
					setUser(res.user);
				}
				setLoading(false);
			})
			.catch(err => {
				setError(err);
				setLoading(false);
			});
	};
  
	const signIn = async form => {
		return await loginApi(form)
			.then(res => {
				if (res && res.success) {
					if (res.accessToken.startsWith("Bearer ")){
						const authToken = res.accessToken.split('Bearer ')[1];

						setCookie('token', authToken);
						localStorage.setItem('refreshToken', res.refreshToken);
					}
					setUser(res.user);
				} else {
					setError("Ошибка авторизации");
				}
			});
	};
  
	const signOut = async () => {
		return await logoutApi()
			.then(res => {
				if (res && res.success) {
					setUser(null);
					deleteCookie('token');
					localStorage.removeItem('refreshToken');
					return Promise.resolve('/login');
				}
			});
	};

	const register = async form => {
		return await registerApi(form)
		  .then(res => {
				if (res && res.success) {
					if (res.accessToken.startsWith("Bearer ")){
						const authToken = res.accessToken.split('Bearer ')[1];
						
						setCookie('token', authToken);
						localStorage.setItem('refreshToken', res.refreshToken);
					}
				  	setUser(res.user);
			} else {
				setError("Ошибка регистрации");
			}
		});
 	};

	const updateUser = async form => {
		return await updateUserDataApi(form)
			.then(res => {
				if (res && res.success) {
					setUser(res.user);
				} else {
					setError("Ошибка при обновлении данных")
				}
			});
	}

	const refreshNewToken = async () => {
		return await refreshTokenApi()
			.then(res => {
				if (res && res.success) {
					if (res.accessToken.startsWith("Bearer ")){
						const authToken = res.accessToken.split('Bearer ')[1];
						
						setCookie('token', authToken);
						localStorage.setItem('refreshToken', res.refreshToken);
					}
				}
			});
	}
  
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