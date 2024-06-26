import { useContext, createContext, useState } from "react";
import { getUserDataApi, loginApi, logoutApi, registerApi, updateUserDataApi } from "../utils/api";
import { deleteCookie, setCookie } from "../utils/cookie";

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

	const getUser = async () => {
		return await getUserDataApi()
			.then(res => {
				if (res && res.success) {
					setUser(res.user);
				}
			});
	};
  
	const signIn = async form => {
		return await loginApi(form)
			.then(res => {
				if (res && res.success) {
					let authToken;
					if (res.accessToken.startsWith("Bearer ")){
						authToken = res.accessToken.split('Bearer ')[1];
					}
	
					if (authToken) {
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
					let authToken;
					if (res.accessToken.startsWith("Bearer ")){
						authToken = res.accessToken.split('Bearer ')[1];
					}

					if (authToken) {
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
  
	return {
		user,
		getUser,
		signIn,
		signOut,
		register,
		updateUser,
		error
	};
}