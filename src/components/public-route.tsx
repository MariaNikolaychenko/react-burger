import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthInfo } from '../services/auth/selectors';
import { useEffect } from 'react';

type TPublicRouteElementProps = {
	element: JSX.Element
}

export const PublicRouteElement = ({ element }: TPublicRouteElementProps) => {
	const { name } = useSelector(getAuthInfo);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from || '/';

	useEffect(() => {
		if (name) {
			navigate(from);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	return element;
}