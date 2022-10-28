import React from 'react';
import AppHeaderButton from '../app-header-button/app-header-button';
import styles from './app-header-nav.module.css';

function AppHeaderNav() {
  return (
    <nav className={styles.header__navigation}>
      <AppHeaderButton icon="BurgerIcon" isActive>
        Конструктор
      </AppHeaderButton>
      <AppHeaderButton icon="ListIcon">Лента заказов</AppHeaderButton>
    </nav>
  );
}

export default AppHeaderNav;
