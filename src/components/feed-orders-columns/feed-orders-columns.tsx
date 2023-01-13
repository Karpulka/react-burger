import React, { FC } from 'react';
import { IOrdersAllItem } from '../../utils/types';
import styles from '../feed-info/feed-info.module.css';
import { v1 as uuid } from 'uuid';

interface IFeedOrdersColumnsParams {
  orders: IOrdersAllItem[][];
}

const FeedOrdersColumns: FC<IFeedOrdersColumnsParams> = ({ orders }) => {
  return (
    <>
      {orders.map((blocks) => {
        return (
          <div key={uuid()} className={styles.column}>
            {blocks.map((order) => (
              <span key={order._id}>{order.number}</span>
            ))}{' '}
          </div>
        );
      })}
    </>
  );
};

export default FeedOrdersColumns;
