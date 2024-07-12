import { useAuth } from '../services/authProvider';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from './preloader/preloader';

type TProtectedRouteElementProps = {
	element: JSX.Element
}

export const ProtectedRouteElement = ({ element }: TProtectedRouteElementProps) => {
	const auth = useAuth();
	const location = useLocation();
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = () => {
		auth.getUser();		
		setUserLoaded(true);
	}

	useEffect(() => {
		init();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isUserLoaded) {
		return <Preloader />
	}

	return auth.user ? element : <Navigate to="/login" replace state={{from: location.pathname}}/>;
}