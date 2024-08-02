import { useEffect } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './profile.module.css';
import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START } from '../../services/constants';
import { getAuthInfo } from '../../services/auth/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Preloader from '../../components/preloader/preloader';
import { getWsUserOrders, getWsUserOrdersConnected } from '../../services/ws/wsSelectors';
import { IMessage } from '../../services/types';
import { Link, useLocation } from 'react-router-dom';
import { WS_URL } from '../../utils/api';

export const Orders = (): React.JSX.Element => {
	const user = useSelector(getAuthInfo);
	const dispatch = useAppDispatch();
	const message: IMessage = useSelector(getWsUserOrders);
	const isConnected = useSelector(getWsUserOrdersConnected);
	const location = useLocation();
	
	useEffect(
		() => {
			if (user.name) {
				dispatch({ type: WS_USER_CONNECTION_START, url: WS_URL, useToken: true});
			}

			return () => {
				dispatch({type: WS_USER_CONNECTION_CLOSED})
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