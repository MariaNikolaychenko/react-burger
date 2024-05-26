import { 
	useState, 
	useEffect 
} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

const App = () => {
	const [apiData, setApiData] = useState({
		isLoading: false,
		hasError: false,
		data: [],
	});

	useEffect(() => {
		const fetchApiData = async () => {
			setApiData({ ...apiData, hasError: false, isLoading: true });

			const apiURL = "https://norma.nomoreparties.space/api/ingredients";

			fetch(apiURL)
				.then(res => {
						if (res.ok) {
							return res.json();
						}
						return Promise.reject(`Ошибка ${res.status}`);
				})
				.then(data => {
					setApiData({ ...apiData, data, isLoading: false });
				})
				.catch((e) => {
					console.log(e);
					setApiData({
						...apiData,
						hasError: true,
						isLoading: false,
					});
				});
		};

		fetchApiData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { data, isLoading, hasError } = apiData;

	const ingredients = data.data;

	return (
		<>
			<AppHeader />
			<main>
				<div className={styles.wrapper}>
					<div className={styles.twoColumnGrid}>
						<section className={styles.burgerIngredients}>
							{isLoading && "Загрузка..."}
							{hasError && "Произошла ошибка"}
							{!isLoading && !hasError && ingredients && (
								<BurgerIngredients data={ingredients} />
							)}
						</section>
						<section className={styles.burgerConstructor}>
							{!isLoading && !hasError && ingredients && (
								<BurgerConstructor data={ingredients} />
							)}
						</section>
					</div>
				</div>
			</main>
		</>
	);
};

export default App;
