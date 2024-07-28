
import AppHeader from "../app-header/app-header";

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import { 
	HomePage,
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
	IngredientPage,
	Profile,
	UserProfile,
	Orders,
	Feed,
	OrderDetails,
	NotFound404
} from "../../pages";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';

import { ProtectedRouteElement } from "../protected-route";

import styles from "./app.module.css";
import { loadIngredients } from "../../services/burger-ingredients/actions";
import { getAuthInfo } from "../../services/auth/selectors";
import { useSelector } from "react-redux";
import { getUserDataAction, refreshTokenAction } from "../../services/auth/actions";
import { getCookie } from "../../utils/cookie";
import { PublicRouteElement } from "../public-route";
import { isTokenExpired } from "../../utils/token";

const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	const background = location.state && location.state.background;
	
	const refreshToken = localStorage.getItem('refreshToken');
	const token = getCookie('token');
	const isExpired = isTokenExpired(token);

	const { isLoginSuccess } = useSelector(getAuthInfo);

	useEffect(() => {
		dispatch(loadIngredients());

		if (refreshToken && isExpired) {
			dispatch(refreshTokenAction());
		}
		
		if (isLoginSuccess || token) {
			dispatch(getUserDataAction());
		}
	  }, [dispatch, token, isLoginSuccess, refreshToken, isExpired]);
	
	return (
		<>
			<AppHeader />
			<main>
				<div className={styles.wrapper}>
					<Routes location={background || location}>
						{/* Home page */}
						<Route path="/" element={<HomePage />} />

						{/* Login */}
						<Route path='/login' element={<PublicRouteElement element ={<Login />} />} />

						{/* Register */}
						<Route path='/register' element={<PublicRouteElement element ={<Register />} />} />

						{/* Forgot password */}
						<Route path='/forgot-password' element={<PublicRouteElement element ={<ForgotPassword />} />} />

						{/* Reset password */}
						<Route path='/reset-password' element={<PublicRouteElement element ={<ResetPassword />} />} />

						{/* Ingredient Details Page */}
						<Route path='/ingredients/:id' element={<IngredientPage />} />

						{/* Profile */}
						<Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
							<Route index element={<UserProfile />} />
							<Route path="orders" element={<Orders />} />
						</Route>

						{/* Feed */}
						<Route path='/feed' element={<Feed />} />

						{/* Order Details */}
						<Route path='/feed/:id' element={<OrderDetails />} />

						<Route path="*" element={<NotFound404/>}/>
					</Routes>

					{/* Ingredient in Modal view  */}
					{background &&
						<Routes>
							<Route path="/ingredients/:id" element={
								<Modal header="Детали ингредиента">
									<IngredientDetails />
								</Modal>
							} />
						</Routes>
					}

					{/* Ingredient in Modal view  */}
					{background &&
						<Routes>
							<Route path="/feed/:id" element={
								<Modal header="Заказ">
									<OrderDetails />
								</Modal>
							} />
						</Routes>
					}
				</div>
			</main>
		</>
	);
};

export default App;