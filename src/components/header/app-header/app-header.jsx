import React from 'react';
import styles from './app-header.module.css';
import AppHeaderNav from '../app-header-nav/app-header-nav';
import AppHeaderButton from '../app-header-button/app-header-button';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <AppHeaderNav />
        <div className={styles.logo}>
          <Logo />
        </div>
        <AppHeaderButton icon="ProfileIcon">Личный кабинет</AppHeaderButton>
      </section>
    </header>
  );
}

export default AppHeader;
