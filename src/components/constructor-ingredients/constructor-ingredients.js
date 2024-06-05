
import {
	DragIcon,
	ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import {
	DELETE_INGREDIENT,
	SORT_INGREDIENTS
} from "../../services/burger-constructor/actions";

import styles from "../constructor-ingredients/constructor-ingredients.module.css";

const ConstructorIngredients = ({ item, index, uuid }) => {
	const dispatch = useDispatch();

	const onDelete = id => {
		dispatch({
		  type: DELETE_INGREDIENT,
		  id
		});
	};

	const dragRef = useRef(null);

	const [{ handlerId }, drop] = useDrop({
		accept: "main"||"sauce",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!dragRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			
			const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;
				const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveIngredients(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [, drag] = useDrag(() => ({
		type: "main"||"sauce",
		item: () => {
			return {uuid, index}
		},
		collect: (monitor) => ({
		  isDragging: monitor.isDragging(),
		}),
	}));

	function moveIngredients(dragIndex, hoverIndex) {
		dispatch({
		  type: SORT_INGREDIENTS,
		  dragIndex: dragIndex,
		  hoverIndex: hoverIndex,
		})
	}

	drag(drop(dragRef))

	return (
		<div  ref={dragRef} data-handler-id={handlerId} className={styles.dragDropContainer}>
			<DragIcon type="primary" />
			<ConstructorElement								
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				extraClass={styles.widthAuto}
				handleClose={()=>onDelete(item.uuid)}
			/>
		</div>
	)
}

export default ConstructorIngredients;