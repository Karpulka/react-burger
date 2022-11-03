import React from 'react';
import Header from '../header/header/header';
import BurgerIngredients, { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { updateElementInArrayByIndex, removeElementInArrayByIndex } from '../../utils/utils';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

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

  return (
    <div className="main">
      <Header />
      <section className="container">
        <h1 className={styles.h1}>Соберите бургер</h1>
      </section>
      <main className={styles.container}>
        <BurgerIngredients addIngredient={addIngredient} selectedIngredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} removeIngredient={removeIngredient} />
      </main>
    </div>
  );
}

export default App;
