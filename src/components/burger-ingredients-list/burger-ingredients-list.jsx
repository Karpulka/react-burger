import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ResultPriceContext } from '../../services/resultPriceContext';
import Modal from '../modal/modal';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { updateElementInArrayByIndex } from '../../utils/utils';

function BurgerIngredientsList({ title, ingredients }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedIngredient, setOpenedIngredient] = useState({});

  const { selectedIngredients, setSelectedIngredients } = useContext(IngredientsContext);
  const { priceDispatcher } = useContext(ResultPriceContext);

  const addIngredient = (ingredient) => {
    if (ingredient) {
      const isIngredientBun = ingredient.type === IngredientTypes.bun;
      const isBunInIngridientsIndex = selectedIngredients.findIndex(
        (ingredient) => ingredient.type === IngredientTypes.bun
      );

      const price = isIngredientBun ? ingredient.price * 2 : ingredient.price;
      priceDispatcher({ type: 'add', payload: price });

      if (!isIngredientBun || isBunInIngridientsIndex === -1) {
        setSelectedIngredients((prevState) => [...prevState, ingredient]);
        return;
      }

      setSelectedIngredients((prevState) =>
        updateElementInArrayByIndex(prevState, isBunInIngridientsIndex, ingredient)
      );
      priceDispatcher({
        type: 'remove',
        payload: selectedIngredients[isBunInIngridientsIndex].price * 2,
      });
    }
  };

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
};

export default BurgerIngredientsList;
