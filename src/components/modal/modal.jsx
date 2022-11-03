import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

function Modal(props) {
  const { children, onClose } = props;
  return ReactDOM.createPortal(
    <>
      <div className={styles['modal-wrapped']} onClick={onClose}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default Modal;
