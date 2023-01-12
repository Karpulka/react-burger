import React, { FC } from 'react';
import OrderItem from '../order-item/order-item';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './orders-list.module.css';

const OrdersList: FC = () => {
  const { orders } = useAppSelector((state) => state.feed);

  return (
    <>
      <section className={styles.list}>
        <div className={styles['custom-scroll']}>
          {orders.map((order) => (
            <OrderItem {...order} key={order._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default OrdersList;
