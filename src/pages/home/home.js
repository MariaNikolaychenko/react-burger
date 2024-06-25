import React from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/burger-ingredients/actions";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import styles from './home.module.css';

export const HomePage = () => {
	const dispatch = useDispatch();
	const { loading, ingredients, error } = useSelector(state => state.ingredients);

	useEffect(() => {
		dispatch(loadIngredients());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) {
		return <h2>Загрузка...</h2>
	}
  
	if (!loading && error) {
		return <h2>{`Ошибка: {error}`}</h2>
	}
  
	if (!loading && ingredients.length === 0) {
		return <h2>Нет ингредиентов</h2>
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.twoColumnGrid}>
				<section className={styles.burgerIngredients}>
					{ingredients && (
						<BurgerIngredients />
					)}
				</section>
				<section className={styles.burgerConstructor}>
					{ingredients && (
						<BurgerConstructor />
					)}
				</section>
			</div>
		</DndProvider>
	);
};