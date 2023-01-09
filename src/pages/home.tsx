import React, { FC } from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';

const HomePage: FC = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector((state: any) => state.ingredients);

  return (
    <>
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      {!ingredientsRequest && !ingredientsFailed ? (
        <main className={styles.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
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
    </>
  );
};

export default HomePage;
