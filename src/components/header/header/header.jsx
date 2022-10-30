import React from 'react';
import styles from './header.module.css';
import HeaderNav from '../header-nav/header-nav';
import HeaderButton from '../header-button/header-button';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <HeaderNav />
        <div className={styles.logo}>
          <Logo />
        </div>
        <HeaderButton icon="ProfileIcon">Личный кабинет</HeaderButton>
      </section>
    </header>
  );
}

export default Header;
