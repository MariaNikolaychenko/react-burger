import {v4 as uuidv4} from 'uuid';

import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../hooks/useModal';

import {
	ConstructorElement, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";

import Price from "../price/price";
import ConstructorIngredients from '../constructor-ingredients/constructor-ingredients';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { 
	ADD_INGREDIENT,
	ADD_INGREDIENT_BUN
} from "../../services/burger-constructor/actions";
import { createOrderAction } from '../../services/order/actions';
import { getConstructorItems } from '../../services/burger-constructor/selectors';
import { getOrderData } from '../../services/order/selectors'

import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';

import styles from "../burger-constructor/burger-constructor.module.css";

const BurgerConstructor = () => {

	const dispatch = useDispatch();
	const { bun, fillings } = useSelector(getConstructorItems);
	const { isOrderFailed, orderNumber } = useSelector(getOrderData);

	const { isModalOpen, openModal, closeModal } = useModal();

	const addIngredientBun = item => {
		dispatch({
			type: ADD_INGREDIENT_BUN,
			...item
		})
	}

	const addIngredient = item => {
		const uuid = uuidv4();
		dispatch({
			type: ADD_INGREDIENT,
			data: {
				...item.data, 
				uuid         
			}
		})
	}

	// Drag and drop
	const [{ canDrop, isOver }, dropTarger] = useDrop({
		accept: "bun"||"main"||"sauce",
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		}),

		drop(itemData) {
			itemData.data.type === 'bun'
			 	? addIngredientBun(itemData)
			 	: addIngredient(itemData)
		},
	});

	const isActive = canDrop || isOver;

	// Итоговая цена
	const totalPrice = useMemo(()=> {
		let totalPrice = 0;
		if (bun) {
			totalPrice += bun.price * 2;
		}
		for (let item of fillings) {
			totalPrice += item.price;
		}
		return totalPrice;
	}, [bun, fillings])

	// Оформить заказ
	const onClickOrderCheckout = () => {
		const order = [bun._id, ...fillings.map((item) => item._id), bun._id];
		dispatch(createOrderAction(order));
		openModal();
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.list} ${isActive ? styles.onHover : ''}`} ref={dropTarger} >
				<div className={styles.bun}>
					{bun 
						?
							<ConstructorElement
								type="top"
								isLocked={true}
								text={`${bun.name} (верх)`}
								price={bun.price}
								thumbnail={bun.image_mobile}
								extraClass={`${styles.bunElement} ${styles.widthAuto}`}
							/>
						:
						<div className={`${styles.emptyConstructorItem} ${styles.emptyConstructorItemPosTop}`}>
							Выберите булку
						</div>
					}
				</div>
				{/* Начинка */}
				<div className={`custom-scroll ${styles.ingredients}`}>
					{fillings.length !== 0 
						?
						fillings.map((ingredient, index) => (
							<ConstructorIngredients
								item={ingredient}
								index={index}
								uuid={ingredient.uuid}
								key={ingredient.uuid}
							/>
							))
						:
						<div className={styles.emptyConstructorItem} >
							Выберите начинку
						</div>
					}
				</div>
				{/* /Начинка */}
				<div className={styles.bun}>
					{bun 
						?
							<ConstructorElement
								type="bottom"
								isLocked={true}
								text={`${bun.name} (низ)`}
								price={bun.price}
								thumbnail={bun.image_mobile}
								extraClass={`${styles.bunElement} ${styles.widthAuto}`}
							/>
						:
						<div className={`${styles.emptyConstructorItem} ${styles.emptyConstructorItemPosBottom}`}>
							Выберите булку
						</div>
					}
				</div>
			</div>
			<div className={styles.total}>
				<Price price={totalPrice} isBig={true} />
				<Button 
					onClick={onClickOrderCheckout} 
					htmlType="button" 
					type="primary" 
					size="large" 
					extraClass="ml-10"
				>
					Оформить заказ
				</Button>
			</div>

			{isModalOpen && !isOrderFailed &&
				<Modal onClose={closeModal}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			}
		</div>
	)
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(
		ingredientType
	)
};