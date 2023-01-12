import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './feed-info.module.css';
import { v1 as uuid } from 'uuid';
import { OrderStatus } from '../../utils/types';

const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  const countOrdersInColumn = 10;
  const maxDoneOrders = 20;

  const doneOrdersAll = orders
    .filter((order) => order.status === OrderStatus.DONE)
    .slice(0, maxDoneOrders);
  const doneOrders = [
    doneOrdersAll.slice(0, countOrdersInColumn),
    doneOrdersAll.slice(countOrdersInColumn),
  ];

  const pendingOrders = orders.filter((order) => order.status !== OrderStatus.DONE);

  return (
    <section className={styles.info}>
      <div className={styles['status-info']}>
        <div>
          <div className="text text_type_main-medium">Готовы:</div>
          <div className={`${styles['order-number']} ${styles.blue}`}>
            {doneOrders.map((orders) => {
              return (
                <div key={uuid()} className={styles.column}>
                  {orders.map((order) => (
                    <span key={order._id}>{order.number}</span>
                  ))}{' '}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text text_type_main-medium">В работе:</div>
          <div className={styles['order-number']}>
            {pendingOrders.map((order) => (
              <span key={order._id}>{order.number}</span>
            ))}
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
