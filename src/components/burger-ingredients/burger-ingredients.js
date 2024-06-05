import { useState, useRef, useEffect, useMemo } from "react";
import { useModal } from '../../hooks/useModal';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard  from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';

import { useSelector } from "react-redux";
import { getIngredientsApi } from "../../services/burger-ingredients/selectors";
import { getConstructorItems } from "../../services/burger-constructor/selectors";

import styles from './burger-ingredients.module.css';


const BurgerIngredients = () => {
	const ingredients = useSelector(getIngredientsApi);
	const { bun, fillings } = useSelector(getConstructorItems);

	const [current, setCurrent] = useState('buns');
	const [ingredientDetails, setIngredientDetails] = useState(null);
	
	const scrollSectionRef = useRef(null);
	const bunsRef = useRef(null);
	const saucesRef = useRef(null);
	const fillingsRef = useRef(null);
	
	const { isModalOpen, openModal, closeModal } = useModal();

	// Счётчик
	const getCount = useMemo(() => {
	    const count = {};
	    if (bun) {
	        count[bun._id] = 2;
	    }
	    for (let item of fillings) {
	        if (!(item._id in count)) {
	            count[item._id] = 0;
	        }
	        count[item._id]++;
	    }
	    return count;
	}, [bun, fillings]);

	// Смена активного заголовка в табах
	const handleScroll = () => {
		// координаты
		const scrollSectionOffsetTop = (scrollSectionRef.current) ? scrollSectionRef.current.offsetTop : null;
		const bunsTopCoordinate = (bunsRef.current) ? bunsRef.current.getBoundingClientRect().top : null;
		const saucesTopCoordinate = (saucesRef.current) ? saucesRef.current.getBoundingClientRect().top : null;
		const fillingsTopCoordinate = (fillingsRef.current) ? fillingsRef.current.getBoundingClientRect().top : null;

		// расстояние до верхней границы
		const bunsDiff = Math.abs(scrollSectionOffsetTop - bunsTopCoordinate);
		const saucesDiff = Math.abs(scrollSectionOffsetTop - saucesTopCoordinate);
		const fillingsDiff = Math.abs(scrollSectionOffsetTop - fillingsTopCoordinate);

		// минимальное значение разницы до верхней границы
		if ( fillingsDiff < saucesDiff && fillingsDiff < bunsDiff ) {
			setCurrent('fillings');
		} else if (saucesDiff < bunsDiff && saucesDiff < fillingsDiff) {
			setCurrent('sauces');
		} else {
			setCurrent('buns');
		}
	}
	
	useEffect(() => {
		document.getElementById(`${current}`)?.scrollIntoView();
	},[current])

	// Модальное окно
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
			<div ref={scrollSectionRef} onScroll={handleScroll} className={`custom-scroll ${styles.container}`}>
				<div id={"buns"} ref={bunsRef}>
					<p className={styles.ingredientTitle}>
						Булки
					</p>
					<div className={styles.cardList}>
						{ingredients.filter(ingredient => ingredient.type === "bun").map((ingredient) => (
								<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
									<IngredientCard data={ingredient} count={getCount[ingredient._id]}/>
								</div>
						))}
					</div>
				</div>
				<div id={"sauces"} ref={saucesRef} className={styles.category}>
					<p className={styles.ingredientTitle}>
						Соусы
					</p>
					<div className={styles.cardList}>
						{ingredients.filter(ingredient => ingredient.type === "sauce").map((ingredient) => (
							<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} count={getCount[ingredient._id]} />
							</div>
						))}
					</div>
				</div>
				<div id={"fillings"} ref={fillingsRef} className={styles.category}>
					<p className={styles.ingredientTitle}>
						Начинки
					</p>
					<div className={styles.cardList}>
						{ingredients.filter(ingredient => ingredient.type === "main").map((ingredient) => (
							<div key={ingredient._id} onClick={()=>handleOpenModal(ingredient)}>
								<IngredientCard data={ingredient} count={getCount[ingredient._id]} />
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