import React, { useContext } from 'react';
import doneImg from '../../images/done.png';
import styles from './order-details.module.css';
import { orderMocks } from '../../utils/data';
import { NewOrderContext } from '../../services/newOrderContext';

function OrderDetails() {
  const image = orderMocks.image ? orderMocks.image : doneImg;
  const { newOrder } = useContext(NewOrderContext);
  console.log(newOrder);
  return (
    <div className={styles['order-result']}>
      {newOrder ? (
        <>
          <div className={styles.number}>{newOrder.order.number}</div>
          <div className="text text_type_main-medium mb-15">{orderMocks.text}</div>
          <img src={image} alt="Order created" className={styles.image} />
          <p className="text text_type_main-default mb-2">{orderMocks.status}</p>
          <p className="text text_type_main-default text_color_inactive">
            {orderMocks.description}
          </p>
        </>
      ) : (
        <div className="text text_type_main-medium mb-15 text_color_inactive">
          Что-то пошло не так :(
          <br />
          Попробуйте оформить заказ позже.
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
