import { useEffect, useMemo, useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './feed.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/constants';
import { useSelector } from 'react-redux';
import { getWsOrders, getWsOrdersConnected } from '../../services/ws/wsSelectors';
import { IMessage, IWsOrders } from '../../services/types';
import Preloader from '../../components/preloader/preloader';
import { Link, useLocation } from 'react-router-dom';
import { WS_URL_ALL } from '../../utils/api';

export const Feed = (): React.JSX.Element => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const message: IMessage = useSelector(getWsOrders);
	const isConnected = useSelector(getWsOrdersConnected);
	const [orders, setOrders] = useState<IWsOrders[]>([]);
	const [total, setTotal] = useState(0);
	const [totalToday, setTotalToday] = useState(0);
	//const [doneOrders, setDoneOrders] = useState<IWsOrders[]>([]);
	//const [pendingOrders, setPendingOrders] = useState<IWsOrders[]>([]);

	useEffect(
		() => {
			
			dispatch({ type: WS_CONNECTION_START, url: WS_URL_ALL });
			return () => {
				dispatch({type: WS_CONNECTION_CLOSED})
			}
		},
		[dispatch] // eslint-disable-line react-hooks/exhaustive-deps
	);

	useEffect(() => {
		if (!!message.orders) {
			setOrders(message.orders);
		}
		setTotal(message?.total);
        setTotalToday(message?.totalToday)
	}, [message]);


	const doneOrders = useMemo(() => {
		return orders.filter((order: IWsOrders) => order.status === 'done').slice(0, 10);
	}, [orders]);

	const pendingOrders = useMemo(() => {
		return orders.filter((order: IWsOrders) => order.status === 'pending').slice(0, 10);
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
							{doneOrders.map((item, index) => (
								<span key={index}>{item.number}</span>
							))}
						</div>
						
					</div>
					<div className={styles.inProcessOrders}>
						<div className={styles.headline}>В работе:</div>
						<div className={styles.orderIds}>
							{pendingOrders.map((item, index) => (
								<span key={index}>{item.number}</span>
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