import { useAuth } from '../services/authProvider';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from './preloader/preloader';
import PropTypes from 'prop-types';


export const ProtectedRouteElement = ({ element }) => {
	let { getUser, ...auth } = useAuth();
	const location = useLocation();
	const [isUserLoaded, setUserLoaded] = useState(false);

	const init = async () => {
		await getUser();
		setUserLoaded(true);
	};

	useEffect(() => {
		init();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isUserLoaded) {
		return <Preloader />
	}

	return auth.user ? element : <Navigate to="/login" replace state={{from: location.pathname}}/>;
}

ProtectedRouteElement.propTypes = {
	element: PropTypes.element.isRequired
}