import React from 'react';
import PropTypes from 'prop-types';
import doneImg from '../../images/done.png';
import styles from './order-details.module.css';
import { orderMocks } from '../../utils/data';
import { useSelector } from 'react-redux';

function OrderDetails(props) {
  const image = orderMocks.image ? orderMocks.image : doneImg;
  const { orderFailed } = useSelector((state) => state.order);

  if (orderFailed) {
    return (
      <div className="text text_type_main-medium mb-15 text_color_inactive">
        Что-то пошло не так :(
        <br />
        Попробуйте оформить заказ позже.
      </div>
    );
  }

  return (
    <div className={styles['order-result']}>
      {props.orderNumber ? (
        <>
          <div className={styles.number}>{props.orderNumber}</div>
          <div className="text text_type_main-medium mb-15">{orderMocks.text}</div>
          <img src={image} alt="Order created" className={styles.image} />
          <p className="text text_type_main-default mb-2">{orderMocks.status}</p>
          <p className="text text_type_main-default text_color_inactive">
            {orderMocks.description}
          </p>
        </>
      ) : (
        <div className="text text_type_main-medium mb-15 text_color_inactive">Loading...</div>
      )}
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};

export default OrderDetails;
