import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from '../index.module.css';

export const IngredientPage = () => {

	return (
		<div className={`${styles.positionCenter} ${styles.marginTop130}`}>
			<h1 className="text text_type_main-large">Детали  ингредиента</h1>
			<IngredientDetails />
		</div>
	);
};