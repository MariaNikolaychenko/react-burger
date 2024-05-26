import { useState } from 'react';
import {
	DragIcon,
	ConstructorElement, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';

// индексы тестовых ингредиентов в конструкторе
import { testConstructorIds } from '../../utils/config';

import styles from "../burger-constructor/burger-constructor.module.css";

const BurgerConstructor = ({ data }) => {

	const testConstructorData = testConstructorIds.map((index) => data.find(item => item._id === index));

	const [openModal, setOpenModal] = useState(false);

	function handleOpenModal() {
		setOpenModal(true);
	}

	function handleCloseModal() {
		setOpenModal(false);
	}

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				<div className={styles.bun}>
					{testConstructorData.filter(item => item.type === "bun").map((ingredient, index) => (
						<ConstructorElement
							key={index}
							type="top"
							isLocked={true}
							text={ingredient.name}
							price={ingredient.price}
							thumbnail={ingredient.image_mobile}
							extraClass={`${styles.bunElement} ${styles.widthAuto}`}
						/>
					))}
				</div>
				<div className={`custom-scroll ${styles.ingredients}`}>
					{testConstructorData.filter(item => item.type !== "bun").map((ingredient, index) => (
						<div className={styles.dragDropContainer} key={index}>
							<DragIcon type="primary" />
							<ConstructorElement								
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image_mobile}
								extraClass={styles.widthAuto}
							/>
						</div>
					))}
				</div>
				<div className={styles.bun}>
					{testConstructorData.filter(item => item.type === "bun").map((ingredient, key) => (
						<ConstructorElement
							key={key}
							type="top"
							isLocked={true}
							text={ingredient.name}
							price={ingredient.price}
							thumbnail={ingredient.image_mobile}
							extraClass={`${styles.bunElement} ${styles.widthAuto}`}
						/>
					))}
				</div>
			</div>
			<div className={styles.total}>
				<Price price={620} isBig={true} />
				<Button 
					onClick={handleOpenModal} 
					htmlType="button" 
					type="primary" 
					size="large" 
					extraClass="ml-10"
				>
					Оформить заказ
				</Button>
			</div>

			{
			openModal && 
				<Modal onClose={handleCloseModal}>
					<OrderDetails />
				</Modal>
			}
		</div>
	)
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape(
			ingredientType
		)
	)
};