import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./price.module.css";

type TPriceProps = {
	price: number,
	isBig?: boolean
}

const Price = ({ price, isBig }: TPriceProps): React.JSX.Element => {
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