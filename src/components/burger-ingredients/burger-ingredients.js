import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard  from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';


const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = useState('buns');

	const [openModal, setOpenModal] = useState(false);
	const [ingredientDetails, setIngredientDetails] = useState({
		name: null,
		image: null,
		calories: null,
		proteins: null,
		fat: null,
		carbohydrates: null
	});

	function handleOpenModal(ingredient) {
		setOpenModal(true);
		setIngredientDetails({
			name: ingredient.name,
			image: ingredient.image_large,
			calories: ingredient.calories,
			proteins: ingredient.proteins,
			fat: ingredient.fat,
			carbohydrates: ingredient.carbohydrates
		});
	}

	function handleCloseModal() {
		setOpenModal(false);
		setIngredientDetails({
			name: null,
			image: null,
			calories: null,
			proteins: null,
			fat: null,
			carbohydrates: null
		});
	}

	return (
		<>
			<p className={styles.title}>
				Соберите бургер
			</p>
			<div className={styles.tabs}>
				<Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={`custom-scroll ${styles.container}`}>
				<div>
					<p className={styles.ingredientTitle}>
						Булки
					</p>
					<div className={styles.cardList}>
						{data.filter(ingredient => ingredient.type === "bun").map((ingredient, index) => (
								<div key={index} onClick={()=>handleOpenModal(ingredient)}>
									<IngredientCard data={ingredient} />
								</div>
						))}
					</div>
				</div>
				<div className={styles.category}>
					<p className={styles.ingredientTitle}>
						Соусы
					</p>
					<div className={styles.cardList}>
						{data.filter(ingredient => ingredient.type === "sauce").map((ingredient, index) => (
							<div key={index} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} />
							</div>
						))}
					</div>
				</div>
				<div className={styles.category}>
					<p className={styles.ingredientTitle}>
						Начинки
					</p>
					<div className={styles.cardList}>
						{data.filter(ingredient => ingredient.type === "main").map((ingredient, index) => (
							<div key={index} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} />
							</div>
						))}
					</div>
				</div>
			</div>

			{
			openModal &&
				<Modal header="Детали ингредиента" onClose={handleCloseModal}>
					<IngredientDetails details={ingredientDetails} />
				</Modal>
			}

		</>
	)
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape(
			ingredientType
		)
	)
};