import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import ProfileInfo from '../components/profile-info/profile-info';
import styles from './profile.module.css';

function ProfilePage() {
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
        onSelectTab: () => {},
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
