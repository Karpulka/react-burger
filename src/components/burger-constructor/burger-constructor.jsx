import React, { useState } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllIngredients } from '../../services/reducers/ingredients';
import { createOrder } from '../../services/actions/order';
import { clearNewOrder } from '../../services/reducers/order';
import { useHistory } from 'react-router-dom';

function BurgerConstructor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selected: selectedIngredients } = useSelector((state) => state.ingredients);
  const { user } = useSelector((state) => state.user);
  const { newOrder, orderRequest } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const notDisableOrderCreate =
    selectedIngredients &&
    selectedIngredients.length > 1 &&
    selectedIngredients.find((ingredient) => ingredient.type === IngredientTypes.bun);

  const onCreateOrderClick = async () => {
    if (!Object.keys(user).length) {
      history.push('/login');
      return;
    }

    const ingredients = selectedIngredients.map((ingredient) => ingredient._id);
    dispatch(createOrder({ ingredients }));
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    dispatch(removeAllIngredients());
    dispatch(clearNewOrder());
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
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={onCreateOrderClick}
              disabled={!notDisableOrderCreate}>
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      {isModalOpen && !orderRequest && (
        <Modal onClose={onModalClose}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
