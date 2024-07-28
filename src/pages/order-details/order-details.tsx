import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from '../../components/price/price';
import styles from './order-details.module.css';
import { useParams } from "react-router-dom";


export const OrderDetails = (): React.JSX.Element => {
	let orders = null;
	const { id } = useParams();

	//order = id && (orders || []).find((order: any) => order.id === +id);

	return (
		<div className={styles.container}>
			<div className={styles.orderId}>#034533</div>
			<div className={styles.title}>Black Hole Singularity острый бургер</div>
			<div className={`${styles.status} ${true ? styles.statusDone : ''}`}>
				Создан
			</div>
			<div className={styles.consistContainer}>
				<div className={styles.title}>Состав:</div>

				<div className={styles.consistList}>
					<div className={styles.item}>
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src='https://code.s3.yandex.net/react/code/bun-01-mobile.png'
								alt="ingredients name"
							/>
						</div>
						<div className={styles.name}>
							Филе Люминесцентного тетраодонтимформа
						</div>
						<div className={styles.details}>
							<span>1</span> x <Price price={300} />
						</div>
					</div>
					
					<div className={styles.item}>
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src='https://code.s3.yandex.net/react/code/bun-01-mobile.png'
								alt="ingredients name"
							/>
						</div>
						<div className={styles.name}>
							Флюоресцентная булка R2-D3
						</div>
						<div className={styles.details}>
							<span>2</span> x <Price price={20} />
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src='https://code.s3.yandex.net/react/code/bun-01-mobile.png'
								alt="ingredients name"
							/>
						</div>
						<div className={styles.name}>
							Флюоресцентная булка R2-D3
						</div>
						<div className={styles.details}>
							<span>2</span> x <Price price={20} />
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src='https://code.s3.yandex.net/react/code/bun-01-mobile.png'
								alt="ingredients name"
							/>
						</div>
						<div className={styles.name}>
							Флюоресцентная булка R2-D3
						</div>
						<div className={styles.details}>
							<span>2</span> x <Price price={20} />
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.imageBox}>
							<img
								className={styles.image}
								src='https://code.s3.yandex.net/react/code/bun-01-mobile.png'
								alt="ingredients name"
							/>
						</div>
						<div className={styles.name}>
							Флюоресцентная булка R2-D3
						</div>
						<div className={styles.details}>
							<span>2</span> x <Price price={20} />
						</div>
					</div>

				</div>
			</div>
			<div className={styles.totalOrder}>
				<div className={styles.date}>
					<FormattedDate date={new Date('2024-07-12T10:26:46.158Z')} />
				</div>
				<Price price={510} />
			</div>
		</div>
	)
}