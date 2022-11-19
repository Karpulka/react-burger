import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="main">
      <AppHeader />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      {!ingredientsRequest && !ingredientsFailed ? (
        <main className={styles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      ) : (
        ingredientsFailed && (
          <h2 className={styles.error}>
            Сервис временно не доступен :(
            <br />
            Пожалуйста, попробуйте позже.
          </h2>
        )
      )}
    </div>
  );
}

export default App;
