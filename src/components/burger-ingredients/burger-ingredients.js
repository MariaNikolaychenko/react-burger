import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard  from '../ingredient-card/ingredient-card';
import { useModal } from '../../hooks/useModal';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';


const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = useState('buns');

	const { isModalOpen, openModal, closeModal } = useModal();

	const [ingredientDetails, setIngredientDetails] = useState(null);

	function handleOpenModal(ingredient) {
		openModal();
		setIngredientDetails(ingredient);
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
						{data.filter(ingredient => ingredient.type === "bun").map((ingredient) => (
								<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
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
						{data.filter(ingredient => ingredient.type === "sauce").map((ingredient) => (
							<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
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
						{data.filter(ingredient => ingredient.type === "main").map((ingredient) => (
							<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} />
							</div>
						))}
					</div>
				</div>
			</div>

			{isModalOpen &&
				<Modal header="Детали ингредиента" onClose={closeModal}>
					<IngredientDetails ingredient={ingredientDetails} />
				</Modal>
			}
		</>
	)
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(
		ingredientType
	)
};