import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from "../price/price";

import { useDrag } from "react-dnd";

import { TIngredient } from "../../utils/types";

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
	data: TIngredient,
	count: number
}

type TDragObject = {
	data: TIngredient;
}

type TDragCollectedProps = {
	isDragging: boolean;
}
const IngredientCard = ({ data, count }: TIngredientCardProps): React.JSX.Element => {
	const [{ isDragging }, dragRef] = useDrag<TDragObject, unknown, TDragCollectedProps>(() => ({
		type: "bun"||"main"||"sauce",
		item: { data },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId()
		}),
	}));

	const opacity = isDragging ? .5 : 1;

	return (
		<div style={{ opacity }} className={styles.card} ref={dragRef}>
			<picture>
				<source media="(max-width: 769px)" srcSet={data.image_mobile} />
				<img src={data.image} alt={data.name}/>
			</picture>
			<Price price={data.price} />
			<p className={styles.name}>{data.name}</p>
			{(count > 0) && 
				<Counter count={count} size="default"/>}
		</div>
	)
}

export default IngredientCard;