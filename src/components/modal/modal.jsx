import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

function Modal(props) {
  const { children, header, onClose } = props;

  useEffect(() => {
    const onEscPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEscPress);

    return () => document.removeEventListener('keydown', onEscPress);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles['modal-wrapped']}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {header && <div className={styles.header}>{header}</div>}
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
  header: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
