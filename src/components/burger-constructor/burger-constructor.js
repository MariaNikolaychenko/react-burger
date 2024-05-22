import { useState } from 'react';
import {
	ConstructorElement, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import DragDropIcon from "../drag-drop-icon/drag-drop-icon";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';

// индексы тестовых ингредиентов в конструкторе
import testConstructorIds  from '../../utils/config';

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
							extraClass={`ml-8 ${styles.widthAuto}`}
						/>
					))}
				</div>
				<div className={`custom-scroll ${styles.ingredients}`}>
					{testConstructorData.filter(item => item.type !== "bun").map((ingredient, index) => (
						<div className={styles.dragDropContainer} key={index}>
							<DragDropIcon />
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
							extraClass={`ml-8 ${styles.widthAuto}`}
						/>
					))}
				</div>
			</div>
			<div className={`mt-4 ${styles.total}`}>
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