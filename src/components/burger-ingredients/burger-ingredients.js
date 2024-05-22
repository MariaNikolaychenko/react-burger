import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard  from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
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
			<p className={`text text_type_main-large ${styles.title}`}>
				Соберите бургер
			</p>
			<div style={{ display: 'flex' }}>
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
			<div className={styles.container}>
				<div>
					<p className={`text text_type_main-medium ${styles.title}`}>
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
					<p className={`text text_type_main-medium ${styles.title}`}>
						Соусы
					</p>
					<div className={styles.cardList}>
						{data.filter(ingredient => ingredient.type === "sause").map((ingredient, index) => (
							<div key={index} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} />
							</div>
						))}
					</div>
				</div>
				<div className={styles.category}>
					<p className={`text text_type_main-medium ${styles.title}`}>
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
		PropTypes.shape({
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
	)
};