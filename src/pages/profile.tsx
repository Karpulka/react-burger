import React, { FC, useEffect } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import ProfileInfo from '../components/profile-info/profile-info';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { logout } from '../services/actions/user';
import styles from './profile.module.css';
import { connect, disconnect } from '../services/reducers/personal-orders';
import { useLocation } from 'react-router-dom';
import OrdersList from '../components/orders-list/orders-list';
import { WebsocketStatus } from '../utils/types';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const personalOrdersPath = '/profile/orders';
  const { status } = useAppSelector((state) => state.personalOrders);

  useEffect(() => {
    if (location.pathname === personalOrdersPath && status === WebsocketStatus.OFFLINE) {
      const token = window.localStorage.getItem('token');
      dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token}`));
    }

    return () => {
      if (!location.pathname.includes(personalOrdersPath)) {
        dispatch(disconnect());
      }
    };
  }, [location, status]);

  const sidebarProps = {
    navigation: [
      {
        title: 'Профиль',
        value: 'profile',
        link: '/profile',
      },
      {
        title: 'История заказов',
        value: 'orders',
        link: '/profile/orders',
      },
      {
        title: 'Выход',
        value: 'logout',
        onSelectTab: () => {
          dispatch(logout());
        },
      },
    ],
  };

  return (
    <section className="container profile-page">
      <div className={styles.profile}>
        <Sidebar {...sidebarProps} />
        <div className={styles.content}>
          {location.pathname.includes(personalOrdersPath) ? (
            <OrdersList isPersonalOrders />
          ) : (
            <ProfileInfo />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
