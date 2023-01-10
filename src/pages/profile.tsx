import React, { FC } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import ProfileInfo from '../components/profile-info/profile-info';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logout } from '../services/actions/user';
import styles from './profile.module.css';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

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
    <section className="container">
      <div className={styles.profile}>
        <Sidebar {...sidebarProps} />
        <div>
          <ProfileInfo />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
