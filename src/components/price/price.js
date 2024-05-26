import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

import styles from "./price.module.css";

const Price = ({ price, isBig }) => {
	const classPrice = isBig
	? `${styles.price} ${styles.sizeLarge}`
	: `${styles.price} ${styles.sizeDefault}`;

	return (
		<span className={classPrice}>
			{price}
			<CurrencyIcon type="primary" />
		</span>
	)
}

export default Price;

Price.propTypes = {
	price: PropTypes.number,
	isBig: PropTypes.bool
}