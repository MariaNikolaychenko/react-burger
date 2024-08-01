
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
	NotFound404,
	OrderInfo
} from "../../pages";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';

import { ProtectedRouteElement } from "../protected-route";

import styles from "./app.module.css";
import { loadIngredients } from "../../services/burger-ingredients/actions";
import { getUserDataAction } from "../../services/auth/actions";
import { getCookie } from "../../utils/cookie";
import { PublicRouteElement } from "../public-route";

const App = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	const background = location.state && location.state.background;
	
	useEffect(() => {
		dispatch(loadIngredients());

		if (getCookie('token')) {
			dispatch(getUserDataAction());
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							<Route path="orders/:id" element={<OrderInfo />} />
						</Route>

						{/* Feed */}
						<Route path='/feed' element={<Feed />} />

						{/* Order Details */}
						<Route path='/feed/:id' element={<OrderInfo />} />

						<Route path="*" element={<NotFound404/>}/>
					</Routes>

					{/*  Modals view  */}
					{background &&
						<Routes>
							{/* Ingredients info */}
							<Route path="/ingredients/:id" element={
								<Modal header="Детали ингредиента">
									<IngredientDetails />
								</Modal>
							} />

							{/* Order info */}
							<Route path="/feed/:id" element={
								<Modal>
									<OrderInfo />
								</Modal>
							} />

							{/* User's order info */}
							<Route path="/profile/orders/:id" element={
								<Modal>
									<OrderInfo />
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