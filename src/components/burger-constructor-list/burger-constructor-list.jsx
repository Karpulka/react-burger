import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';

function BurgerConstructorList(props) {
  const onDeleteClick = (ingredientId) => {
    props.removeIngredient(ingredientId);
  };

  return (
    <div className={styles.list}>
      {props.ingredients &&
        props.ingredients.map((ingredient, key) => {
          let elementProps = {
            text: ingredient.name,
            thumbnail: ingredient.image_mobile,
            price: ingredient.price,
          };
          const isBun = ingredient.type === IngredientTypes.bun;

          if (key === 0 && isBun) {
            elementProps.type = 'top';
            elementProps.isLocked = true;
          } else if (key === props.ingredients.length - 1 && isBun) {
            elementProps.type = 'bottom';
            elementProps.isLocked = true;
          } else {
            elementProps.handleClose = onDeleteClick.bind({}, ingredient._id);
          }

          return (
            <div className={`${styles.item} constructor__item`} key={`${ingredient._id}-${key}`}>
              {!elementProps.type && <DragIcon type="primary" />}
              <ConstructorElement {...elementProps} />
            </div>
          );
        })}
    </div>
  );
}

BurgerConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  removeIngredient: PropTypes.func,
};

export default BurgerConstructorList;
