import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
	Button,
	CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

import styles from './modal.module.css';


const Modal = ({ children, header, onClose }) => {
	function handlerKeyPress(event) {
		if (event.keyCode === 27) {
			event.preventDefault();
			onClose();
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handlerKeyPress);
	
		return () => {
			document.removeEventListener("keydown", handlerKeyPress);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay onClose={onClose}></ModalOverlay>
				<div className={styles.modal}>
					<div className={styles.dialog}>
						<Button
							extraClass={styles.closeButton}
							htmlType="button"
							type="secondary"
							size="medium"
							onClick={onClose}
						>
							<CloseIcon type="primary" />
						</Button>
						{header &&
							<h3 className={`text text_type_main-large ${styles.header}`}>{header}</h3>
						}
						{children}
					</div>
				</div>
			</>
		),
		document.getElementById('modal-root')
	);
}

export default Modal;

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	header: PropTypes.string,
	onClose: PropTypes.func
}