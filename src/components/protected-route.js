import { useAuth } from '../services/authProvider';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProtectedRouteElement = ({ element }) => {
	let { getUser, ...auth } = useAuth();
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
		return null;
	}

	return auth.user ? element : <Navigate to="/login" replace/>;
}