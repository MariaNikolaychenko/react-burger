import { useEffect, useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './feed.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/constants';
// import { useAuth } from '../../services/authProvider';
import { useSelector } from 'react-redux';
import { getMessage, getWsConnected } from '../../services/ws/wsSelectors';
import { IMessage, IWsOrders } from '../../services/types';
import Preloader from '../../components/preloader/preloader';
import { Link, useLocation } from 'react-router-dom';

export const Feed = (): React.JSX.Element => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const message: IMessage = useSelector(getMessage);
	const isConnected = useSelector(getWsConnected);
	const [orders, setOrders] = useState<IWsOrders[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [totalToday, setTotalToday] = useState<number>(0);
	const [doneOrders, setDoneOrders] = useState<IWsOrders[]>([]);
	const [pendingOrders, setPendingOrders] = useState<IWsOrders[]>([]);

	//const { user } = useAuth();
	useEffect(
		() => {
			//if (user) {
				dispatch({ type: WS_CONNECTION_START });
			//}

			return () => {
				dispatch({type: WS_CONNECTION_CLOSED})
			}
		},
		//[user, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
		[dispatch] // eslint-disable-line react-hooks/exhaustive-deps
	);

	useEffect(() => {
		if (!!message.orders) {
			setOrders(message.orders);
		}
		setTotal(message?.total);
        setTotalToday(message?.totalToday)
	}, [message]);

	useEffect(() => {
		if (!!orders && orders?.length !== 0) {
			const searchDoneOrders = orders.filter((order: IWsOrders) => order.status === 'done').slice(0, 10);
			const searchPendingOrders = orders.filter((order: IWsOrders) => order.status === 'pending').slice(0, 10);
			setDoneOrders(searchDoneOrders);
			setPendingOrders(searchPendingOrders);
		}
	}, [orders]);

	if (!isConnected) return <Preloader />

    return(
		<div className={styles.twoColumnGrid}>
			<section className={styles.feed}>
				<p className={styles.title}>
					Лента заказов
				</p>
				<div className={styles.feedContainer}>
					{!!message && message.orders?.map((order, index) => (
						<Link 
							key={index}
							to={`${order.number}`}
							state={{background: location}}
							className={styles.feedCard}
						>
							<OrderCard order={order} />
						</Link>
					))}
				</div>
			</section>
			<section className={styles.orderInfo}>
				<div className={styles.orderBoard}>
					<div>
						<div className={styles.headline}>Готовы:</div>
						<div className={`${styles.orderIds} ${styles.completedOrder}`}>
							{doneOrders.map((item) => (
								<span>{item.number}</span>
							))}
						</div>
						
					</div>
					<div className={styles.inProcessOrders}>
						<div className={styles.headline}>В работе:</div>
						<div className={styles.orderIds}>
							{pendingOrders.map((item) => (
								<span>{item.number}</span>
							))}
						</div>
					</div>
				</div>
				<div className={styles.stats}>
					<div className={styles.headline}>Выполнено за все время:</div>
					<div className={styles.statsTotal}>
						{total}
					</div>
				</div>
				<div className={styles.stats}>
					<div className={styles.headline}>Выполнено за сегодня:</div>
					<div className={styles.statsTotal}>
						{totalToday}
					</div>
				</div>
			</section>
		</div>
	);
};