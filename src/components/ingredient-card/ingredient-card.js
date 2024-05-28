import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from "../price/price";
import { ingredientType } from "../../utils/types";

// индексы тестовых ингредиентов в конструкторе для отображения счётчика
import { testConstructorIds } from "../../utils/config";

import styles from './ingredient-card.module.css';

const IngredientCard = ({ data }) => {
	const countIngredient = testConstructorIds.filter(id => id === data._id).length;

	return (
		<div className={styles.card}>
			<picture>
				<source media="(max-width: 769px)" srcSet={data.image_mobile} />
				<img src={data.image} alt={data.name}/>
			</picture>
			<Price price={data.price} />
			<p className={styles.name}>{data.name}</p>
			{(countIngredient > 0) && 
				<Counter count={countIngredient} size="default"/>}
		</div>
	)
}

export default IngredientCard;

IngredientCard.propTypes = {
	data: ingredientType
};