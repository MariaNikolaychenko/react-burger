
import AppHeader from "../app-header/app-header";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
	ProfileLogout,
	NotFound404
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route";

import styles from "./app.module.css";

const App = () => {
	return (
		<>
			<AppHeader />
			<BrowserRouter>
				<main>
					<div className={styles.wrapper}>
						<Routes>
							{/* Home page */}
							<Route path="/" element={<HomePage />} />

							{/* Login */}
							<Route path='/login' element={<Login />} />

							{/* Register */}
							<Route path='/register' element={<Register />} />

							{/* Forgot password */}
							<Route path='/forgot-password' element={<ForgotPassword />} />

							{/* Reset password */}
							<Route path='/reset-password' element={<ResetPassword />} />

							{/* Ingredient Details Page */}
							<Route path='ingredients/:id' element={<IngredientPage />} />

							{/* Profile */}
							<Route path='/profile' element={<ProtectedRouteElement element={<Profile />} />} >
								<Route index element={<UserProfile />} />
								<Route path="orders" element={<Orders />} />
								<Route path="logout" element={<ProfileLogout />} />
							</Route>

							<Route path="*" element={<NotFound404/>}/>
						</Routes>
					</div>
				</main>
			</BrowserRouter>
		</>
	);
};

export default App;