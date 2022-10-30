import React from 'react';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import styles from './burger-constructor-list-parts.module.css';

function BurgerConstructorListParts({ ingredients, removeIngredient }) {
  const isIngredients = ingredients && ingredients.length;
  const firstPartIngredients = isIngredients ? [ingredients[0]] : [];
  const centralPart =
    isIngredients && ingredients.length > 2 ? ingredients.slice(1, ingredients.length - 2) : [];
  const lastPartIngredients = isIngredients ? [ingredients[ingredients.length - 1]] : [];

  return (
    <>
      <BurgerConstructorList
        ingredients={firstPartIngredients}
        removeIngredient={removeIngredient}
      />
      <div className={styles['custom-scroll']}>
        <BurgerConstructorList ingredients={centralPart} removeIngredient={removeIngredient} />
      </div>
      <BurgerConstructorList
        ingredients={lastPartIngredients}
        removeIngredient={removeIngredient}
        isLastPart={true}
      />
    </>
  );
}

BurgerConstructorListParts.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  removeIngredient: PropTypes.func,
};

export default BurgerConstructorListParts;
