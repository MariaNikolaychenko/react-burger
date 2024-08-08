import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
	Button,
	CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';

import styles from './modal.module.css';

// const isKeyboardEvent = (e: SyntheticEvent): e is React.KeyboardEvent => {
//     return (e as React.KeyboardEvent).getModifierState !== undefined
// }

type TModalProps = {
	children: React.JSX.Element,
	header?: string,
	onClose?: () => void
}

const Modal = ({ children, header, onClose }: TModalProps): React.JSX.Element => {

	const navigate = useNavigate();

	function handleClose(): void {
		onClose ? onClose() : navigate(-1);
	}

	function checkPressEsc(e: KeyboardEvent) {
		e.stopPropagation();

		if (e.key === "Escape") {
			handleClose();
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", checkPressEsc);
	
		return () => {
			document.removeEventListener("keydown", checkPressEsc);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay onClose={handleClose}/>
				<div className={styles.modal} data-testid="modal">
					<div className={styles.dialog}>
						<Button
							extraClass={styles.closeButton}
							htmlType="button"
							type="secondary"
							size="medium"
							onClick={handleClose}
							data-testid="modal-close_button"
						>
							<CloseIcon type="primary" />
						</Button>
						{header &&
							<h3 className={styles.header} data-testid="modal-header">{header}</h3>
						}
						{children}
					</div>
				</div>
			</>
		),
		document.getElementById('modal-root')!
	);
}

export default Modal;