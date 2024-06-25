import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { getCurrentIngredient } from "../../services/ingredient/selectors.js";
import { useSelector } from "react-redux";

import styles from '../index.module.css';

export const IngredientPage = () => {
	const { currentIngredient } = useSelector(getCurrentIngredient);;

	return (
		<div className={`${styles.positionCenter} ${styles.marginTop130}`}>
			<h1 className="text text_type_main-large">Детали  ингредиента</h1>
			<IngredientDetails ingredient={currentIngredient} />
		</div>
	);
};