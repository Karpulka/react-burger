import React from 'react';
import HeaderButton from '../header-button/header-button';
import styles from './header-nav.module.css';

function HeaderNav() {
  return (
    <nav className={styles.header__navigation}>
      <HeaderButton icon="BurgerIcon" isActive>
        Конструктор
      </HeaderButton>
      <HeaderButton icon="ListIcon">Лента заказов</HeaderButton>
    </nav>
  );
}

export default HeaderNav;
