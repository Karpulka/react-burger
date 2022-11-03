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
    <>
      {props.ingredients && props.ingredients.length ? (
        <div className={styles.list}>
          {props.ingredients.map((ingredient, key) => {
            let elementProps = {
              text: ingredient.name,
              thumbnail: ingredient.image_mobile,
              price: ingredient.price,
            };
            const isBun = ingredient.type === IngredientTypes.bun;
            let classValue = '';

            if (key === 0 && isBun && !props.isLastPart) {
              elementProps.type = 'top';
              elementProps.isLocked = true;
              classValue = styles['first-item'];
            } else if (key === props.ingredients.length - 1 && isBun) {
              elementProps.type = 'bottom';
              elementProps.isLocked = true;
              classValue = styles['last-item'];
            } else {
              elementProps.handleClose = onDeleteClick.bind({}, ingredient._id);
            }

            return (
              <div
                className={`${styles.item} ${classValue} constructor__item`}
                key={`${ingredient._id}-${key}`}>
                {!elementProps.type && <DragIcon type="primary" />}
                <ConstructorElement {...elementProps} />
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

BurgerConstructorList.defaultProps = {
  isLastPart: false,
};

BurgerConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  removeIngredient: PropTypes.func,
  isLastPart: PropTypes.bool,
};

export default BurgerConstructorList;