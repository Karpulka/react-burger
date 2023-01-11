import React, { FC } from 'react';
import styles from './home.module.css';
import OrdersList from '../components/orders-list/orders-list';

const FeedPage: FC = () => {
  return (
    <>
      <section className="container">
        <h1 className={styles.h1}>Лента заказов</h1>
      </section>
      <main className={styles.container}>
        <OrdersList />
      </main>
    </>
  );
};

export default FeedPage;
