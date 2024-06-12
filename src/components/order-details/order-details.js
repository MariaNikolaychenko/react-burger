import acceptedImage from "../../images/checkWithBg.svg";
import PropTypes from 'prop-types';

import styles from "./order-details.module.css";

const OrderDetails = ({ orderNumber }) => {
	return (
		<div className={styles.container}>
			<p className={styles.orderNumber}>{orderNumber}</p>
			<p className={styles.title}>идентификатор заказа</p>
			<img className={styles.acceptedIcon} src={acceptedImage} alt="accepted icon"/>
			<p className={styles.orderStatus}>Ваш заказ начали готовить</p>
			<p className={styles.orderText}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;

OrderDetails.propTypes = {
	orderNumber: PropTypes.number
};