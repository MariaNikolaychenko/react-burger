import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from "../price/price";
import PropTypes from 'prop-types';

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
			<p className={`text text_type_main-default ${styles.name}`}>{data.name}</p>
			{(countIngredient > 0) && 
				<Counter count={countIngredient} size="default"/>}
		</div>
	)
}

export default IngredientCard;

IngredientCard.propTypes = {
	data: PropTypes.shape({
		_id:PropTypes.string,
		name:PropTypes.string,
		type: PropTypes.string,
		proteins: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
		calories: PropTypes.number,
		price: PropTypes.number,
		image: PropTypes.string,
		image_mobile: PropTypes.string,
		image_large: PropTypes.string
	})
};