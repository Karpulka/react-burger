import React, { FC } from 'react';
import { IOrdersAllItem } from '../../utils/types';
import styles from '../feed-info/feed-info.module.css';
import OrdersByColumnsItem from '../../utils/utils';

type TOrdersByColumnsItem<T extends { _id: string; number: number }> = typeof OrdersByColumnsItem;

interface IFeedOrdersColumnsParams {
  orders: TOrdersByColumnsItem<IOrdersAllItem>[];
}

const FeedOrdersColumns: FC<IFeedOrdersColumnsParams> = ({ orders }) => {
  return (
    <>
      {orders.map((block) => {
        return (
          <div key={block.key} className={styles.column}>
            {block.items.map((order) => (
              <span key={order._id}>{order.number}</span>
            ))}{' '}
          </div>
        );
      })}
    </>
  );
};

export default FeedOrdersColumns;
