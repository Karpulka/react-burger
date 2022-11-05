import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients, { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { updateElementInArrayByIndex, removeElementInArrayByIndex } from '../../utils/utils';

const API_URL = 'https://norma.nomoreparties.space/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(`${API_URL}/ingredients`);

        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }

        const allIngredients = await res.json();

        if (allIngredients.success && allIngredients.data.length) {
          setAllIngredients(allIngredients.data);
        } else {
          throw res;
        }
      } catch (e) {
        console.log('Fetch ingredients error', e);
        console.error(e);
      }
    };
    getIngredients();
  }, []);

  const addIngredient = (ingredient) => {
    if (ingredient) {
      const isIngredientBun = ingredient.type === IngredientTypes.bun;
      const isBunInIngridientsIndex = ingredients.findIndex(
        (ingredient) => ingredient.type === IngredientTypes.bun
      );

      if (isIngredientBun && isBunInIngridientsIndex > -1) {
        setIngredients((prevState) =>
          updateElementInArrayByIndex(prevState, isBunInIngridientsIndex, ingredient)
        );
        return;
      }

      setIngredients((prevState) => [...prevState, ingredient]);
    }
  };

  const removeIngredient = (ingredientId) => {
    if (ingredientId) {
      setIngredients((prevState) => {
        const ingredientIndex = prevState.findIndex(
          (ingredient) => ingredient._id === ingredientId
        );

        if (ingredientIndex > -1) {
          return removeElementInArrayByIndex(prevState, ingredientIndex);
        }

        return prevState;
      });
    }
  };

  const removeAllIngredients = () => {
    setIngredients([]);
  };

  return (
    <div className="main">
      <AppHeader />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      {allIngredients.length ? (
        <main className={styles.container}>
          <BurgerIngredients
            addIngredient={addIngredient}
            selectedIngredients={ingredients}
            allIngredients={allIngredients}
          />
          <BurgerConstructor
            ingredients={ingredients}
            removeIngredient={removeIngredient}
            removeAllIngredients={removeAllIngredients}
          />
        </main>
      ) : (
        <h2 className={styles.error}>
          Сервис временно не доступен :(
          <br />
          Пожалуйста, попробуйте позже.
        </h2>
      )}
    </div>
  );
}

export default App;
