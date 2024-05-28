import PropTypes from 'prop-types';

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
	return (
		<div className={styles.overlay} onClick={onClose}/>
	)
}

export default ModalOverlay;

ModalOverlay.propTypes = {
	onClose: PropTypes.func
}