import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';
import { setCurrentIngredient } from '../../services/reducers/ingredients';

import { useDispatch, useSelector } from 'react-redux';

function BurgerIngredientsList({ title, ingredients }) {
  const { selected: selectedIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const onIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const ingredientCount = useMemo(
    () => (ingredientId) => {
      return selectedIngredients.reduce(
        (count, ingredient) => (ingredient._id === ingredientId ? count + 1 : count),
        0
      );
    },
    [selectedIngredients]
  );

  return (
    <>
      <div className={styles.ingredients}>
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
    </>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredientsList;
