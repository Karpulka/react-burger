import React from 'react';
import Header from '../header/header/header';
import BurgerIngredients, { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { mocks } from '../../utils/data';
import { updateElementInArrayByIndex, removeElementInArrayByIndex } from '../../utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
    this.allIngredients = mocks;
  }

  componentDidMount() {
    document.addEventListener('click', this.removeIngredient);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.removeIngredient);
  }

  addIngredient = (ingredient) => {
    if (ingredient) {
      const isIngredientBun = ingredient.type === IngredientTypes.bun;
      const isBunInIngridientsIndex = this.state.ingredients.findIndex(
        (ingredient) => ingredient.type === IngredientTypes.bun
      );

      if (isIngredientBun && isBunInIngridientsIndex > -1) {
        this.setState((prevState) => {
          return {
            ingredients: updateElementInArrayByIndex(
              prevState.ingredients,
              isBunInIngridientsIndex,
              ingredient
            ),
          };
        });
        return;
      }

      this.setState((prevState) => {
        return {
          ingredients: [...prevState.ingredients, ingredient],
        };
      });
    }
  };

  removeIngredient = (event) => {
    const parentElement = event.target.closest('.constructor__item');
    if (parentElement) {
      const ingredientId = parentElement.getAttribute('data-ingredient');
      this.setState((prevState) => {
        const ingredientIndex = prevState.ingredients.findIndex(
          (ingredient) => ingredient._id === ingredientId
        );

        if (ingredientIndex > -1) {
          return {
            ingredients: removeElementInArrayByIndex(prevState.ingredients, ingredientIndex),
          };
        }

        return { ingredients: prevState.ingredients };
      });
    }
  };

  render() {
    return (
      <div className="main">
        <Header />
        <section className="container">
          <h1 className={styles.h1}>Соберите бургер</h1>
        </section>
        <main className={styles.container}>
          <BurgerIngredients
            addIngredient={this.addIngredient}
            selectedIngredients={this.state.ingredients}
          />
          <BurgerConstructor ingredients={this.state.ingredients} />
        </main>
      </div>
    );
  }
}

export default App;
