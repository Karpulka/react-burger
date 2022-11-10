import React, { useContext, useState } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ResultPriceContext } from '../../services/resultPriceContext';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedIngredients } = useContext(IngredientsContext);
  const { resultPrice, priceDispatcher } = useContext(ResultPriceContext);

  const onCreateOrderClick = () => {
    setIsModalOpen(true);
  };

  const removeAllIngredients = () => {
    setSelectedIngredients([]);
    priceDispatcher({ type: 'reset' });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    removeAllIngredients();
  };

  return (
    <>
      <section className={styles.section}>
        <BurgerConstructorListParts />
        {resultPrice.price > 0 && (
          <div className={`${styles.result}`}>
            <Price price={resultPrice.price} />
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
