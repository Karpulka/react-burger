import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-list.module.css';

function BurgerIngredientsList({ title, ingredients, anchor }) {
  return (
    <div className={styles.ingredients} id={anchor}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={styles.list}>
        {ingredients.map((ingredient) => {
          const { __v, ...ingredientProps } = ingredient;
          return <BurgerIngredientsItem {...ingredientProps} key={ingredient._id} />;
        })}
      </div>
    </div>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
  anchor: PropTypes.string.isRequired,
};

export default BurgerIngredientsList;
