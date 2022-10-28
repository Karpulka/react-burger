import React from 'react';
import AppHeader from '../header/app-header/app-header';
import AppBurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <div className="main">
      <AppHeader />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      <main className={styles.container}>
        <AppBurgerConstructor />
      </main>
    </div>
  );
}

export default App;
