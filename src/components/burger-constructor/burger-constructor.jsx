import React, { useContext, useState } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ResultPriceContext } from '../../services/resultPriceContext';
import { apiRequest } from '../../utils/api';
import { NewOrderContext } from '../../services/newOrderContext';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedIngredients, setSelectedIngredients } = useContext(IngredientsContext);
  const { resultPrice, priceDispatcher } = useContext(ResultPriceContext);
  const [newOrder, setNewOrder] = useState({});

  const onCreateOrderClick = async () => {
    const ingredients = selectedIngredients.map((ingredient) => ingredient._id);
    const order = await apiRequest('/orders', { ingredients }, 'POST');
    setNewOrder(order);
    setIsModalOpen(true);
  };

  const removeAllIngredients = () => {
    setSelectedIngredients([]);
    priceDispatcher({ type: 'reset' });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    removeAllIngredients();
    setNewOrder({});
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
          <NewOrderContext.Provider value={{ newOrder }}>
            <OrderDetails />
          </NewOrderContext.Provider>
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
