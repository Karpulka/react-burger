import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  return <div className={styles['modal-overlay']} onClick={props.onClose}></div>;
};

export default ModalOverlay;
