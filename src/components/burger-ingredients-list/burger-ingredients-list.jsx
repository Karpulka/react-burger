import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';
import { addIngredient, setCurrentIngredient } from '../../services/reducers/ingredients';

import { useDispatch, useSelector } from 'react-redux';

function BurgerIngredientsList({ title, ingredients }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selected: selectedIngredients, currentIngredient } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();

  const onIngredientClick = (ingredient) => {
    setIsModalOpen(true);
    dispatch(setCurrentIngredient(ingredient));
    dispatch(addIngredient(ingredient));
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

  const onModalClose = () => {
    setIsModalOpen(false);
    dispatch(setCurrentIngredient({}));
  };

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
      {isModalOpen && (
        <Modal header={'Детали ингредиента'} onClose={onModalClose}>
          <IngredientDetails {...currentIngredient} />
        </Modal>
      )}
    </>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredientsList;
