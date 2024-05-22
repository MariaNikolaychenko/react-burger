import PropTypes from 'prop-types';

import styles from "../ingredient-details/ingredient-details.module.css";

const IngredientDetails = ({ details }) => {
	const { name, image,  calories, proteins, fat, carbohydrates } = details;

	return (
		<div>
			<img
				className={`mt-1 mb-4`}
				src={image}
				alt={name}
			/>
			<p className={`text text_type_main-medium mb-4`}>
				{name}
			</p>
			<ul className={styles.list}>
				<li className={styles.item}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Калории,ккал
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{calories}
					</p>
				</li>
				<li className={styles.item}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Белки, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{proteins}
					</p>
				</li>
				<li className={styles.item}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Жиры, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{fat}
					</p>
				</li>
				<li className={styles.item}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Углеводы, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	)
}

export default IngredientDetails;

IngredientDetails.propTypes = {
	details: PropTypes.shape({
		name:PropTypes.string,
		proteins: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
		calories: PropTypes.number,
		image: PropTypes.string
	})
};