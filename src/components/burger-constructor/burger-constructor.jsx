import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeElementInArrayByIndex } from '../../utils/utils';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor.module.css';

function BurgerConstructor(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addIngredientsWithBun = (bunIndex) => {
    const bunTop = Object.assign({}, props.ingredients[bunIndex], {
      name: `${props.ingredients[bunIndex].name} (верх)`,
    });
    const bunBottom = Object.assign({}, props.ingredients[bunIndex], {
      name: `${props.ingredients[bunIndex].name} (низ)`,
    });
    const otherIngredients = removeElementInArrayByIndex(props.ingredients, bunIndex);
    return [].concat([bunTop], otherIngredients, [bunBottom]);
  };

  const prepareIngredients = () => {
    const bunIndex = props.ingredients.findIndex(
      (ingredient) => ingredient.type === IngredientTypes.bun
    );

    if (bunIndex === -1) {
      return props.ingredients;
    }

    return addIngredientsWithBun(bunIndex);
  };

  const getResultPrice = (ingredients) => {
    if (ingredients && ingredients.length) {
      return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }

    return 0;
  };

  const onCreateOrderClick = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    props.removeAllIngredients();
  };

  const selectedIngredients = prepareIngredients();
  const resultPrice = getResultPrice(selectedIngredients);

  return (
    <>
      <section className={styles.section}>
        <BurgerConstructorListParts
          ingredients={selectedIngredients}
          removeIngredient={props.removeIngredient}
        />
        {resultPrice > 0 && (
          <div className={`${styles.result}`}>
            <Price price={resultPrice} />
            <Button type="primary" size="large" htmlType="button" onClick={onCreateOrderClick}>
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      {isModalOpen && (
        <Modal onClose={onModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  removeIngredient: PropTypes.func,
  removeAllIngredients: PropTypes.func,
};

export default BurgerConstructor;
