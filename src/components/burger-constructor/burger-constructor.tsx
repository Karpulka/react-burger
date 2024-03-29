import React, { useState, FC } from 'react';
import BurgerConstructorListParts from '../burger-constructor-list-parts/burger-constructor-list-parts';
import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { removeAllIngredients } from '../../services/reducers/ingredients';
import { createOrder } from '../../services/actions/order';
import { clearNewOrder } from '../../services/reducers/order';
import { useHistory } from 'react-router-dom';
import { IIngredientType } from '../../utils/types';
import { getResultPrice } from '../../utils/utils';

const BurgerConstructor: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { selected: selectedIngredients } = useAppSelector((state) => state.ingredients);
  const { user } = useAppSelector((state) => state.user);
  const { newOrder } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const notDisableOrderCreate =
    selectedIngredients &&
    selectedIngredients.length > 1 &&
    selectedIngredients.find(
      (ingredient: IIngredientType) => ingredient.type === IngredientTypes.bun
    );

  const onCreateOrderClick = () => {
    if (!Object.keys(user).length) {
      history.push('/login');
      return;
    }
    setIsModalOpen(true);
    const ingredients = selectedIngredients.map((ingredient: IIngredientType) => ingredient._id);
    dispatch(createOrder({ ingredients }));
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    dispatch(removeAllIngredients());
    dispatch(clearNewOrder());
  };

  const orderNumber = newOrder?.order?.number;
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
      {isModalOpen && (
        <Modal onClose={onModalClose}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
