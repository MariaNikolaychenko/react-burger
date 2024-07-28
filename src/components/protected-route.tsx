import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthInfo } from '../services/auth/selectors';
import { useEffect } from 'react';

type TProtectedRouteElementProps = {
	element: JSX.Element
}

export const ProtectedRouteElement = ({ element }: TProtectedRouteElementProps) => {
	const { name } = useSelector(getAuthInfo);
	const location = useLocation();
	const navigate = useNavigate();
	
	const from = location.state?.from || '/login';

	useEffect(() => {
		if (!name) {
			navigate(from);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	return (
		<>
			{name && element}
		</>
	);
}