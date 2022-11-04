import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';

function BurgerIngredientsList({ title, ingredients, addIngredient, selectedIngredients }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedIngredient, setOpenedIngredient] = useState({});

  const onIngredientClick = (ingredient) => {
    setIsModalOpen(true);
    setOpenedIngredient(ingredient);
    addIngredient(ingredient);
  };

  const ingredientCount = (ingredientId) => {
    return selectedIngredients.reduce(
      (count, ingredient) => (ingredient._id === ingredientId ? count + 1 : count),
      0
    );
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setOpenedIngredient({});
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
          <IngredientDetails {...openedIngredient} />
        </Modal>
      )}
    </>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  addIngredient: PropTypes.func,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredientsList;
