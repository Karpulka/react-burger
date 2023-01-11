import React, { FC } from 'react';
import { ordersListMocks } from '../../utils/data';
import OrderItem from '../order-item/order-item';
import styles from './orders-list.module.css';

const OrdersList: FC = () => {
  const orders = ordersListMocks;
  return (
    <>
      <section className={styles.list}>
        <div className={styles['custom-scroll']}>
          {orders.map((order) => (
            <OrderItem order={order} key={order._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default OrdersList;
