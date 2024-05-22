import acceptedImage from "../../images/checkWithBg.svg";

const OrderDetails = () => {
	return (
		<div className={`pt-30 pb-15`}>
			<p className={`text text_type_digits-large`}>034536</p>
			<p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
			<img style={{margin: '70px 0 65px'}} src={acceptedImage} alt="accepted icon"/>
			<p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
			<p className={`mt-2 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;