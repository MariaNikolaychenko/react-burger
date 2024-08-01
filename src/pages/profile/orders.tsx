import { useEffect } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './profile.module.css';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_USER_START } from '../../services/constants';
import { getAuthInfo } from '../../services/auth/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Preloader from '../../components/preloader/preloader';
import { getWsMessage, getWsConnected } from '../../services/ws/wsSelectors';
import { IMessage } from '../../services/types';
import { Link, useLocation } from 'react-router-dom';

export const Orders = (): React.JSX.Element => {
	const user = useSelector(getAuthInfo);
	const dispatch = useAppDispatch();
	const message: IMessage = useSelector(getWsMessage);
	const isConnected = useSelector(getWsConnected);
	const location = useLocation();
	
	useEffect(
		() => {
			if (user.name) {
				dispatch({ type: WS_CONNECTION_USER_START });
			}

			return () => {
				dispatch({type: WS_CONNECTION_CLOSED})
			}
		},
		[dispatch, user.name]
	);

	if (!isConnected) return <Preloader />
	
	return (
		<div className={styles.orderHistory}>
			{!!message && message.orders?.map((order, index) => (
			 	<Link 
					key={index}
					to={`${order.number}`}
					state={{background: location}}
					className={styles.orderCard}
				>
					<OrderCard order={order} showStatus={true} />
				</Link>
			)).reverse()}
		</div>
	)
}