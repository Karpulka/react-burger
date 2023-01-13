import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './feed-info.module.css';
import { v1 as uuid } from 'uuid';
import { IOrdersAllItem, OrderStatus } from '../../utils/types';
import { divideArray } from '../../utils/utils';
import FeedOrdersColumns from '../feed-orders-columns/feed-orders-columns';

const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  const maxDoneOrders = 20;

  const doneOrdersAll = orders
    .filter((order) => order.status === OrderStatus.DONE)
    .slice(0, maxDoneOrders);
  const doneOrders = divideArray<IOrdersAllItem>(doneOrdersAll);

  const otherOrders = orders.filter((order) => order.status !== OrderStatus.DONE);
  const pendingOrders = divideArray<IOrdersAllItem>(otherOrders);

  return (
    <section className={styles.info}>
      <div className={styles['status-info']}>
        <div>
          <div className="text text_type_main-medium">Готовы:</div>
          <div className={`${styles['order-number']} ${styles.blue}`}>
            <FeedOrdersColumns orders={doneOrders} />
          </div>
        </div>
        <div>
          <div className="text text_type_main-medium">В работе:</div>
          <div className={styles['order-number']}>
            <FeedOrdersColumns orders={pendingOrders} />
          </div>
        </div>
      </div>
      <div>
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className={styles.number}>{total}</div>
      </div>
      <div>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className={styles.number}>{totalToday}</div>
      </div>
    </section>
  );
};

export default FeedInfo;
