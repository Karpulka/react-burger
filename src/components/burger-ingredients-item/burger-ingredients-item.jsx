import React from 'react';
import Price from '../price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-item.module.css';
import PropTypes from 'prop-types';

function BurgerIngredientsItem(props) {
  const { image, name, price } = props.ingredient;
  return (
    <div
      className={`${styles.ingredient} ingredient__item`}
      onClick={props.ingredientClick.bind({}, props.ingredient)}>
      <img src={image} alt={name} className={styles.image} />

      <Price price={price} />
      <div className={styles.name}>{name}</div>
      {props.count > 0 && <Counter count={props.count} size="default" />}
    </div>
  );
}

BurgerIngredientsItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType),
  ingredientClick: PropTypes.func,
  count: PropTypes.number,
};

export default BurgerIngredientsItem;
