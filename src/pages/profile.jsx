import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import ProfileInfo from '../components/profile-info/profile-info';
import { useDispatch } from 'react-redux';
import { logout } from '../services/actions/user';
import styles from './profile.module.css';

function ProfilePage() {
  const dispatch = useDispatch();

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
}

export default ProfilePage;
