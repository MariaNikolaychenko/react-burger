import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/burger-ingredients/selectors';

import styles from "../ingredient-details/ingredient-details.module.css";


const IngredientDetails = () => {
	let ingredient = null;
	let { id } = useParams();
	const ingredients = useSelector(getIngredients);

	ingredient = id && (ingredients || []).find((item) => item._id === id);
	
	if (!ingredient) {
		return (
			<div className={`${styles.positionCenter} ${styles.marginTop130}`}>
				<h2>Ингредиента с таким id не существует.</h2>
			</div>
		);
	}

	const { name, image_large,  calories, proteins, fat, carbohydrates } = ingredient;

	return (
		<div>
			<img
				className={styles.image}
				src={image_large}
				alt={name}
			/>
			<p className={styles.name}>
				{name}
			</p>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Калории,ккал
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{calories}
					</p>
				</li>
				<li className={styles.listItem}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Белки, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{proteins}
					</p>
				</li>
				<li className={styles.listItem}>
					<p className="text text_type_main-default text_color_inactive mb-1">
						Жиры, г
					</p>
					<p className="text text_type_digits-default text_color_inactive">
						{fat}
					</p>
				</li>
				<li className={styles.listItem}>
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