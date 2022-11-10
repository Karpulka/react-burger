import React, { useContext, useState } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedIngredients, setSelectedIngredients } = useContext(IngredientsContext);

  const getResultPrice = (ingredients) => {
    if (ingredients && ingredients.length) {
      return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }

    return 0;
  };

  const onCreateOrderClick = () => {
    setIsModalOpen(true);
  };

  const removeAllIngredients = () => {
    setSelectedIngredients([]);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    removeAllIngredients();
  };

  const resultPrice = getResultPrice(selectedIngredients);

  return (
    <>
      <section className={styles.section}>
        <BurgerConstructorListParts />
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

export default BurgerConstructor;
