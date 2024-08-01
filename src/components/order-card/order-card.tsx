import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import Price from '../price/price';
import styles from './order-card.module.css';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { TIngredient } from '../../utils/types';
import { useEffect, useState } from 'react';
import { IWsOrders } from "../../services/types";

type TOrderCardProps = {
	order: IWsOrders;
	showStatus?: boolean;
}
const OrderCard = ({order, showStatus}: TOrderCardProps): React.JSX.Element => {
	const ingredients = useSelector(getIngredients);
	const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState(0);
	const [countHiddenIngredients, setCountHiddenIngredients] = useState(0);
	const maxIngredientsNumber = 6;

	useEffect(() => {
		if (ingredients?.length !== 0) {
			let totalPrice = 0;

			const orderIngredients = ingredients.filter((ingredient: TIngredient) => {
				return order.ingredients.some((id) => ingredient._id === id);
			})

			orderIngredients.map((item) => {
				if (item.type === 'bun') {
					totalPrice += 2 * item.price;
				} else {
					totalPrice += item.price;
				}

				return totalPrice;
			})
			setCountHiddenIngredients(orderIngredients.length - maxIngredientsNumber + 1);
			const displayedIngredients = orderIngredients.slice(0, maxIngredientsNumber);
			setPrice(totalPrice);
			setOrderIngredients(displayedIngredients);
		}
	}, [ingredients, order.ingredients]);

	const status = order.status === 'done'
		? 'Выполнен'
		: order.status === 'created'
			? 'Создан'
			: 'Готовится';

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.orderId}>
					#{order.number}
				</div>
				<div className={styles.date}>
					<FormattedDate date={new Date(order.createdAt)} />
				</div>
			</div>
			<div className={styles.title}>
				{order.name}
			</div>
			{showStatus && 
			<div className={`${styles.status} ${order.status === 'done' ? styles.statusDone : ''}`}>
				{status}
			</div>}
			<div className={styles.container}>
				<div className={styles.imageList}>
					{orderIngredients.map((item, index) => (
						<div key={index} className={styles.imageBox}>
							<img
								className={styles.image}
								src={item.image_mobile}
								alt={item.name}
							/>
							{(index + 1 === orderIngredients.length) && (countHiddenIngredients > 1) && 
								<span className={styles.hiddenCount}>+{countHiddenIngredients}</span>
							}


						</div>
					))}
				</div>
				<Price price={price} />
			</div>
		</div>
	)
}

export default OrderCard;