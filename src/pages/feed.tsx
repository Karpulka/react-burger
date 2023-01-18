import React, { FC, useEffect } from 'react';
import styles from './home.module.css';
import OrdersList from '../components/orders-list/orders-list';
import FeedInfo from '../components/feed-info/feed-info';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { connect, disconnect } from '../services/reducers/feed';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <>
      <section className="container">
        <h1 className={styles.h1}>Лента заказов</h1>
      </section>
      <main className={styles.container}>
        <OrdersList />
        <FeedInfo />
      </main>
    </>
  );
};

export default FeedPage;
