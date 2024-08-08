import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthInfo } from '../services/auth/selectors';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';

type TProtectedRouteElementProps = {
	element: JSX.Element
}

export const ProtectedRouteElement = ({ element }: TProtectedRouteElementProps) => {
	const { name } = useSelector(getAuthInfo);
	const navigate = useNavigate();

	useEffect(() => {
		if (!name && !(getCookie('token'))) {
			navigate('/login');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	return (
		<>
			{name && element}
		</>
	);
}