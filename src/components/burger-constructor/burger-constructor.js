import {
	DragIcon,
	ConstructorElement, 
	Button 
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { useModal } from '../../hooks/useModal';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';

// индексы тестовых ингредиентов в конструкторе
import { testConstructorIds } from '../../utils/config';

import styles from "../burger-constructor/burger-constructor.module.css";

const BurgerConstructor = ({ data }) => {

	const testConstructorData = testConstructorIds.map((index) => data.find(item => item._id === index));

	const bun = testConstructorData.find(item => item.type === "bun");
	const fillings = testConstructorData.filter(item => item.type !== "bun");

	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				<div className={styles.bun}>
					{bun &&
						<ConstructorElement
							type="top"
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
							extraClass={`${styles.bunElement} ${styles.widthAuto}`}
						/>
					}
				</div>
				<div className={`custom-scroll ${styles.ingredients}`}>
					{fillings.map((ingredient) => (
						<div className={styles.dragDropContainer} key={ingredient._id}>
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
					{bun &&
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
							extraClass={`${styles.bunElement} ${styles.widthAuto}`}
						/>
					}
				</div>
			</div>
			<div className={styles.total}>
				<Price price={620} isBig={true} />
				<Button 
					onClick={openModal} 
					htmlType="button" 
					type="primary" 
					size="large" 
					extraClass="ml-10"
				>
					Оформить заказ
				</Button>
			</div>

			{isModalOpen && 
				<Modal onClose={closeModal}>
					<OrderDetails />
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