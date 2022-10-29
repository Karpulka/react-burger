import React from 'react';
import AppHeader from '../header/app-header/app-header';
import AppBurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

function App() {
  return (
    <div className="main">
      <AppHeader />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      <main className={styles.container}>
        <AppBurgerIngredients />
      </main>
    </div>
  );
}

export default App;
