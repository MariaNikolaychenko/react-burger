import OrderCard from '../../components/order-card/order-card';
import styles from './profile.module.css';

export const Orders = (): React.JSX.Element => {
	return (
		<div className={styles.orderHistory}>
			<OrderCard showStatus />
			<OrderCard showStatus />
			<OrderCard showStatus />
			<OrderCard showStatus />
		</div>
	)
}