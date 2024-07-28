import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import Price from '../price/price';
import styles from './order-card.module.css';
import { getIngredients } from '../../services/burger-ingredients/selectors';
import { TIngredient } from '../../utils/types';
import { useEffect, useState } from 'react';

type TOrderCardProps = {
	order?: any;
	showStatus?: boolean;
}
const OrderCard = ({order, showStatus}: TOrderCardProps): React.JSX.Element => {
	// console.log('orderAAAA');
	// console.log(order);
	const ingredients = useSelector(getIngredients);
	const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
	const [price, setPrice] = useState(0);

	useEffect(() => {
        if (ingredients?.length !== 0) {
            let totalPrice = 0;

			const orderIngredients = ingredients.filter((ingredient: TIngredient) => {
				return order.ingredients.some((id: string) => ingredient._id === id);
			})

			orderIngredients.map((item) => {
				if (item.type === 'bun') {
					totalPrice += 2 * item.price;
				} else {
					totalPrice += item.price;
				}

				return totalPrice;
			})
			setPrice(totalPrice);
			setOrderIngredients(orderIngredients);
        }
    }, [ingredients, order.ingredients]);


	const status = order.status === 'done'
		? 'Выполнен'
		: order.status === 'created'
			? 'Создан'
			: 'Готовится';

	//console.log(orderIngredients);

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
					{orderIngredients.map((item) => (
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src={item.image_mobile}
								alt={item.name}
							/>
						</div>
					))}
				</div>
				<Price price={price} />
			</div>
		</div>
	)
}

export default OrderCard;