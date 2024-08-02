import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from '../../components/price/price';
import styles from './order-info.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Preloader from "../../components/preloader/preloader";
import { getIngredients } from "../../services/burger-ingredients/selectors";
import { TIngredient } from "../../utils/types";
import { RootState } from "../../services/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getOrderByNumberAction } from "../../services/order/actions";


export const OrderInfo = (): React.JSX.Element => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const order = useSelector((state: RootState) => state.orderData.currentOrder);
	const ingredientsList = useSelector(getIngredients);

	const [orderIngredients, setOrderIngredients] = useState<TIngredient[] | null>(null);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		if (!!ingredientsList) {
			let totalPrice = 0;
			let bun = 0;

			order?.ingredients?.forEach((ingredientId: string) => {
				let targetIngredient = ingredientsList.filter(item => item['_id'] === ingredientId)[0];
				if (targetIngredient.type === 'bun' && !bun) {
					totalPrice += 2 * targetIngredient.price;
					bun = 1;
				}
				if ((targetIngredient.type !== 'bun'))
					totalPrice += targetIngredient.price
			});
			setPrice(totalPrice);

			const orderIngredientsList: TIngredient[] = [];
			const orderIngredientsWithCount:TIngredient[] = []
			let orderUniqueIngredients = Array.from(new Set(order?.ingredients));

			orderUniqueIngredients.forEach(value => orderIngredientsList.push(ingredientsList.filter(ingredient => ingredient['_id'] === value)[0]));
			orderIngredientsList.forEach(item => {
				if (item.type === 'bun') {
					orderIngredientsWithCount.push({
						...item, 
						count: 2
					})
				} else {
					const count = order?.ingredients.filter((ingredient: string) => ingredient === item['_id']).length;
					orderIngredientsWithCount.push({
						...item, 
						count: count
					})
				}
			});

			setOrderIngredients(orderIngredientsWithCount)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingredientsList, order]);

	useEffect(() => {
		if (id) {
			dispatch(getOrderByNumberAction(id));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!order) {
		return <Preloader />
	}

	const status = order.status === 'done'
		? 'Выполнен'
		: order.status === 'created'
			? 'Создан'
			: 'Готовится';

	return (
		<div className={styles.container}>
			<div className={styles.orderId}>#{order.number}</div>
			<div className={styles.title}>{order.name}</div>
			<div className={`${styles.status} ${(order.status === 'done') ? styles.statusDone : ''}`}>
				{status}
			</div>
			<div className={styles.consistContainer}>
				<div className={styles.title}>Состав:</div>

				<div className={styles.consistList}>
					{!!orderIngredients && orderIngredients.map((ingredient, index) => (
						<div className={styles.item} key={index}>
							<div className={styles.imageBox}>
								<img
									className={styles.image}
									src={ingredient.image_mobile}
									alt={ingredient.name}
								/>
							</div>
							<div className={styles.name}>
								{ingredient.name}
							</div>
							<div className={styles.details}>
								<span>{ingredient.count}</span> x <Price price={ingredient.price} />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.totalOrder}>
				<div className={styles.date}>
					<FormattedDate date={new Date(order.createdAt)} />
				</div>
				<Price price={price} />
			</div>
		</div>
	)
}