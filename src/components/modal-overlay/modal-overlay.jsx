import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const modalOverlayRoot = document.getElementById('modal-overlay');

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    <div className={styles['modal-overlay']} onClick={props.onClose}></div>,
    modalOverlayRoot
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
