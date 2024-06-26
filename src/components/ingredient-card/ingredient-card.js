import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from "../price/price";

import { useDrag } from "react-dnd";

import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';

import styles from './ingredient-card.module.css';

const IngredientCard = ({ data, count }) => {
	const [{ isDragging }, dragRef] = useDrag(() => ({
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

IngredientCard.propTypes = {
	data: ingredientType,
	count: PropTypes.number
};