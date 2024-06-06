
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadIngredients} from "../../services/burger-ingredients/actions";

import styles from "./app.module.css";

const App = () => {
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
		<>
			<AppHeader />
			<main>
				<div className={styles.wrapper}>
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
				</div>
			</main>
		</>
	);
};

export default App;
