import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
	Button,
	CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './modal.module.css';


const Modal = ({ children, header, onClose }) => {

	const navigate = useNavigate();

	function handleClose(e) {
		e.stopPropagation();

		if (onClose) {
			onClose();
		} else {
			navigate(-1);
		}
	}

	useEffect(() => {
		function handleCloseModal(evt) {
			if (evt.key === "Escape") {
				handleClose();
			}
		}

		document.addEventListener("keydown", handleCloseModal);
	
		return () => {
			document.removeEventListener("keydown", handleCloseModal);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay onClose={handleClose}/>
				<div className={styles.modal}>
					<div className={styles.dialog}>
						<Button
							extraClass={styles.closeButton}
							htmlType="button"
							type="secondary"
							size="medium"
							onClick={handleClose}
						>
							<CloseIcon type="primary" />
						</Button>
						{header &&
							<h3 className={styles.header}>{header}</h3>
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