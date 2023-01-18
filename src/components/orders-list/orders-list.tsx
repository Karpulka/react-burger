import React, { FC, useEffect, useState } from 'react';
import OrderItem from '../order-item/order-item';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './orders-list.module.css';
import { IOrdersAllItem } from '../../utils/types';

interface IOrderListProps {
  isPersonalOrders?: boolean;
}

const OrdersList: FC<IOrderListProps> = ({ isPersonalOrders }) => {
  const [orders, setOrders] = useState<IOrdersAllItem[]>([]);
  const { orders: feedOrders } = useAppSelector((state) => state.feed);
  const { orders: personalOrders } = useAppSelector((state) => state.personalOrders);

  useEffect(() => {
    const orders = isPersonalOrders ? personalOrders : feedOrders;
    setOrders(orders);
  }, [isPersonalOrders, feedOrders, personalOrders]);

  return (
    <>
      <section className={`${styles.list} order-list`}>
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
