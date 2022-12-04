import React from 'react';
import HeaderButton from '../header-button/header-button';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styles from './header-nav.module.css';

function HeaderNav() {
  const history = useHistory();
  const isConstructor = !!useRouteMatch({ path: '/', exact: true });
  const isFeed = !!useRouteMatch('/feed');

  return (
    <nav className={styles.header__navigation}>
      <HeaderButton
        icon="BurgerIcon"
        isActive={isConstructor}
        onButtonClick={() => {
          history.push('/');
        }}>
        Конструктор
      </HeaderButton>
      <HeaderButton icon="ListIcon" isActive={isFeed}>
        Лента заказов
      </HeaderButton>
    </nav>
  );
}

export default HeaderNav;
