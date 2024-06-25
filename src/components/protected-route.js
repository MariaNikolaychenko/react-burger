import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction } from '../services/auth/actions';
import { getAuthInfo } from '../services/auth/selectors';
import Preloader from '../components/preloader/preloader';

export function ProtectedRouteElement({ element }) {
	const dispatch = useDispatch();
	const { isGetUserLoading, isGetUserFailed, name } = useSelector(getAuthInfo);
	
	useEffect(()=>{
		dispatch(getUserDataAction())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	if (!isGetUserLoading && isGetUserFailed) {
		return <Navigate to='/login' replace />
	}

	return (isGetUserLoading || name === "") ? <Preloader /> : element;
}