import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
	onClose?: () => void
}

const ModalOverlay = ({ onClose }: TModalOverlayProps): React.JSX.Element => {
	return (
		<div className={styles.overlay} onClick={onClose} data-testid="modal-overlay"/>
	)
}

export default ModalOverlay;