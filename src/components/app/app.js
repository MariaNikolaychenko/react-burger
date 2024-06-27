
import AppHeader from "../app-header/app-header";

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ProvideAuth } from "../../services/authProvider";
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
	OrdersList,
	NotFound404
} from "../../pages";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import { loadIngredients } from "../../services/burger-ingredients/actions";
import { ProtectedRouteElement } from "../protected-route";

import styles from "./app.module.css";

const App = () => {
	let location = useLocation();
	const dispatch = useDispatch();

	let background = location.state && location.state.background;

	useEffect(() => {
		dispatch(loadIngredients());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])
	
	return (
		<ProvideAuth>
			<AppHeader />
			<main>
				<div className={styles.wrapper}>
					<Routes location={background || location}>
						{/* Home page */}
						<Route exact path="/" element={<HomePage />} />

						{/* Login */}
						<Route path='/login' element={<Login />} />

						{/* Register */}
						<Route path='/register' element={<Register />} />

						{/* Forgot password */}
						<Route path='/forgot-password' element={<ForgotPassword />} />

						{/* Reset password */}
						<Route path='/reset-password' element={<ResetPassword />} />

						{/* Ingredient Details Page */}
						<Route path='/ingredients/:id' element={<IngredientPage />} />

						{/* Profile */}
						<Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
							<Route index element={<UserProfile />} />
							<Route path="orders" element={<Orders />} />
						</Route>

						{/* Orders List */}
						<Route path='/orders-list' element={<OrdersList />} />

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
				</div>
			</main>
		</ProvideAuth>
	);
};

export default App;