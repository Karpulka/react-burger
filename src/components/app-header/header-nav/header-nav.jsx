import React from 'react';
import HeaderButton from '../header-button/header-button';
import { useHistory } from 'react-router-dom';
import styles from './header-nav.module.css';

function HeaderNav() {
  const history = useHistory();

  return (
    <nav className={styles.header__navigation}>
      <HeaderButton
        icon="BurgerIcon"
        isActive
        onButtonClick={() => {
          history.push('/');
        }}>
        Конструктор
      </HeaderButton>
      <HeaderButton icon="ListIcon">Лента заказов</HeaderButton>
    </nav>
  );
}

export default HeaderNav;
