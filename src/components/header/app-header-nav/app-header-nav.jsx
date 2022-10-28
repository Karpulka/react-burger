import React from 'react';
import AppHeaderButton from '../app-header-button/app-header-button';
import { ButtonTypes } from '../app-header-button/app-header-button';
import styles from './app-header-nav.module.css';

function AppHeaderNav() {
  return (
    <nav className={styles.header__navigation}>
      <AppHeaderButton icon="BurgerIcon">Конструктор</AppHeaderButton>
      <AppHeaderButton icon="ListIcon" type={ButtonTypes.secondary}>
        Лента заказов
      </AppHeaderButton>
    </nav>
  );
}

export default AppHeaderNav;
