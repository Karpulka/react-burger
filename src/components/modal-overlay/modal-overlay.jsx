import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
  return <div className={styles['modal-overlay']} onClick={props.onClose}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
