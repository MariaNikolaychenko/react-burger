import acceptedImage from "../../images/checkWithBg.svg";
import styles from "./order-details.module.css";

type TOrderDetailsProps = {
	orderNumber?: number
}

const OrderDetails = ({ orderNumber }: TOrderDetailsProps): React.JSX.Element => {
	return (
		<div className={styles.container} data-testid="order-details">
			<p className={styles.orderNumber}>{orderNumber}</p>
			<p className={styles.title}>идентификатор заказа</p>
			<img className={styles.acceptedIcon} src={acceptedImage} alt="accepted icon"/>
			<p className={styles.orderStatus}>Ваш заказ начали готовить</p>
			<p className={styles.orderText}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;