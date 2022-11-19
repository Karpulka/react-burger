import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { ResultPriceContext } from '../../services/resultPriceContext';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerConstructorList(props) {
  const { selectedIngredients, setSelectedIngredients } = useContext(IngredientsContext);
  const { priceDispatcher } = useContext(ResultPriceContext);

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item.key !== ingredient.key));
    priceDispatcher({ type: 'remove', payload: ingredient.price });
  };

  const onDeleteClick = (ingredient) => {
    removeIngredient(ingredient);
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
              elementProps.handleClose = onDeleteClick.bind({}, ingredient);
            }

            return (
              <div
                className={`${styles.item} ${classValue} constructor__item`}
                key={ingredient.key}>
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
