import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';

const onDeleteClick = (event) => {
  event.preventDefault();
  const parentElement = event.target.closest('.constructor__item');
  parentElement.classList.add('deliting');
};

function BurgerConstructorList(props) {
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
            elementProps.handleClose = onDeleteClick;
          }

          return (
            <div
              className={`${styles.item} constructor__item`}
              key={`${ingredient._id}-${key}`}
              data-ingredient={ingredient._id}>
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
};

export default BurgerConstructorList;
