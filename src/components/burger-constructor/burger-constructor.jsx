import React, { useState } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { apiRequest } from '../../utils/api';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllIngredients } from '../../services/reducers/ingredients';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({});
  const { selected: selectedIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const getResultPrice = (ingredients) => {
    if (ingredients && ingredients.length) {
      return ingredients.reduce((sum, ingredient) => {
        const price =
          ingredient.type === IngredientTypes.bun ? ingredient.price * 2 : ingredient.price;
        return sum + price;
      }, 0);
    }

    return 0;
  };

  const onCreateOrderClick = async () => {
    try {
      const ingredients = selectedIngredients.map((ingredient) => ingredient._id);
      const order = await apiRequest('/orders', { ingredients }, 'POST');
      setNewOrder(order);
    } catch (e) {
      console.log(`Fetch post order error`, e);
      console.error(e);
    } finally {
      setIsModalOpen(true);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    dispatch(removeAllIngredients());
    setNewOrder({});
  };

  const orderNumber = newOrder && newOrder.order && newOrder.order.number;
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
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
