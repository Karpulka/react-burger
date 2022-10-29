import React from 'react';
import AppHeader from '../header/app-header/app-header';
import AppBurgerIngredients, { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import AppBurgerConstructor from '../burger-constructor/burger-constructor';
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
    document.addEventListener('click', this.addIngredient);
    document.addEventListener('click', this.removeIngredient);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.addIngredient);
    document.removeEventListener('click', this.removeIngredient);
  }

  addIngredient = (event) => {
    const parentElement = event.target.closest('.ingredient__item');

    if (parentElement) {
      const ingredientId = parentElement.getAttribute('id');
      const ingredient = this.allIngredients.find((ingredient) => ingredient._id === ingredientId);

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
        <AppHeader />
        <section className="container">
          <h1 className={styles.h1}>Соберите бургер</h1>
        </section>
        <main className={styles.container}>
          <AppBurgerIngredients />
          <AppBurgerConstructor ingredients={this.state.ingredients} />
        </main>
      </div>
    );
  }
}

export default App;
