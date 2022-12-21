import React, { useEffect, FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

interface IModal {
  children: ReactElement;
  header?: string;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal');

const Modal: FC<IModal> = (props) => {
  const { children, header, onClose } = props;

  useEffect(() => {
    const onEscPress = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEscPress);

    return () => document.removeEventListener('keydown', onEscPress);
  }, [onClose]);

  return modalRoot
    ? ReactDOM.createPortal(
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
      )
    : null;
};

export default Modal;
