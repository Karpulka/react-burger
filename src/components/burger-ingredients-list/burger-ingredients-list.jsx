import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';

function BurgerIngredientsList({ title, ingredients, anchor, addIngredient, selectedIngredients }) {
  const onIngredientClick = (ingredient) => {
    addIngredient(ingredient);
  };

  const ingredientCount = (ingredientId) => {
    return selectedIngredients.reduce(
      (count, ingredient) => (ingredient._id === ingredientId ? count + 1 : count),
      0
    );
  };

  return (
    <div className={styles.ingredients} id={anchor}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={styles.list}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredientsItem
              ingredient={ingredient}
              ingredientClick={onIngredientClick}
              count={ingredientCount(ingredient._id)}
              key={ingredient._id}
            />
          );
        })}
      </div>
    </div>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  anchor: PropTypes.string.isRequired,
  addIngredient: PropTypes.func,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredientsList;
