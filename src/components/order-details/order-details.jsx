import React from 'react';
import doneImg from '../../images/done.png';
import styles from './order-details.module.css';
import { orderMocks } from '../../utils/data';

function OrderDetails() {
  const image = orderMocks.image ? orderMocks.image : doneImg;

  return (
    <div className={styles['order-result']}>
      <div className={styles.number}>{orderMocks.orderNumber}</div>
      <div className="text text_type_main-medium mb-15">{orderMocks.text}</div>
      <img src={image} alt="Order created" className={styles.image} />
      <p className="text text_type_main-default mb-2">{orderMocks.status}</p>
      <p className="text text_type_main-default text_color_inactive">{orderMocks.description}</p>
    </div>
  );
}

export default OrderDetails;
