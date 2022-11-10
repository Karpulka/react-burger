import React, { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ResultPriceContext } from '../../services/resultPriceContext';
import { apiRequest } from '../../utils/api';
import styles from './app.module.css';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [isRequestEnded, setIsRequestEnded] = useState(false);

  const priceReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { price: state.price + action.payload };
      case 'remove':
        return { price: state.price - action.payload };
      case 'reset':
        return initialPriceState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const initialPriceState = { price: 0 };

  const [resultPrice, priceDispatcher] = useReducer(priceReducer, initialPriceState);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const allIngredients = await apiRequest(`/ingredients`);

        if (allIngredients.data.length) {
          setAllIngredients(allIngredients.data);
        } else {
          throw allIngredients;
        }
      } catch (e) {
        console.log('Fetch ingredients error', e);
        console.error(e);
      } finally {
        setIsRequestEnded(true);
      }
    };
    getIngredients();
  }, []);

  return (
    <div className="main">
      <AppHeader />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      {allIngredients.length ? (
        <main className={styles.container}>
          <IngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
            <ResultPriceContext.Provider value={{ resultPrice, priceDispatcher }}>
              <BurgerIngredients allIngredients={allIngredients} />
              <BurgerConstructor />
            </ResultPriceContext.Provider>
          </IngredientsContext.Provider>
        </main>
      ) : (
        isRequestEnded && (
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
