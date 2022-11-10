import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { removeElementInArrayByIndex } from '../../utils/utils';
import { ResultPriceContext } from '../../services/resultPriceContext';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerConstructorList(props) {
  const { selectedIngredients, setSelectedIngredients } = useContext(IngredientsContext);
  const { priceDispatcher } = useContext(ResultPriceContext);

  const removeIngredient = (ingredientId) => {
    if (ingredientId) {
      const ingredient = selectedIngredients.find((ingredient) => ingredient._id === ingredientId);

      priceDispatcher({ type: 'remove', payload: ingredient.price });

      setSelectedIngredients((prevState) => {
        const ingredientIndex = prevState.findIndex(
          (ingredient) => ingredient._id === ingredientId
        );

        if (ingredientIndex > -1) {
          return removeElementInArrayByIndex(prevState, ingredientIndex);
        }

        return prevState;
      });
    }
  };

  const onDeleteClick = (ingredientId) => {
    removeIngredient(ingredientId);
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
  isLastPart: PropTypes.bool,
};

export default BurgerConstructorList;
