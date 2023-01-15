import React, { FC, useEffect, useState } from 'react';
import styles from './order-info.module.css';
import { IIngredientType, IOrdersAllItem, OrderStatusValue } from '../../utils/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getResultPrice } from '../../utils/utils';
import { v1 as uuid } from 'uuid';
import Price from '../price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { getOrderInfo } from '../../services/actions/order';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type TIngredientCount = IIngredientType & { count: number };

const OrderInfo: FC = () => {
  const { id: orderNumber } = useParams();
  const { orders } = useAppSelector((state) => state.feed);
  const { orderInfo } = useAppSelector((state) => state.order);
  const [currentOrder, setCurrentOrder] = useState<IOrdersAllItem | null>(null);
  const { all: allIngredients } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const order = orders.find((item) => item.number === +orderNumber);

    if (order || orderInfo) {
      const resOrder = order ?? orderInfo;
      setCurrentOrder(resOrder as IOrdersAllItem);
    } else {
      dispatch(getOrderInfo(orderNumber));
    }

    return () => {
      setCurrentOrder(null);
    };
  }, [orderInfo]);

  if (!currentOrder || !Object.keys(currentOrder).length) {
    return null;
  }

  const { number, ingredients: ingredientsIds, createdAt, name, status } = currentOrder;

  const doublesCount = (ingredientId: string): number => {
    return ingredientsIds.reduce((count, id, currentIndex) => {
      const firstIngredientIndex = ingredientsIds.findIndex((element) => element === ingredientId);
      return ingredientId === id && firstIngredientIndex !== currentIndex ? count + 1 : count;
    }, 1);
  };

  const getIngredients = (): TIngredientCount[] => {
    const result: TIngredientCount[] = [];

    ingredientsIds.forEach((ingredientId) => {
      const ingredient = allIngredients.find(
        (item) => item._id === ingredientId
      ) as IIngredientType;

      const count = doublesCount(ingredientId);
      const resultHasIngredient = result.find((element) => element._id === ingredientId);

      if (!resultHasIngredient) {
        result.push({ ...ingredient, count });
      }
    });

    return result;
  };

  const ingredients = getIngredients();

  const price = getResultPrice(ingredients);
  const statusValue: string = (OrderStatusValue as { [key: string]: string })[status];

  return (
    <article className={`${styles.info} ingredient-content`}>
      <div className={styles.number}>#{number}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>{statusValue}</div>
      <div className={styles.consist}>
        <div className="text text_type_main-medium mb-3">Cостав:</div>
        <div className={styles['custom-scroll']}>
          <div className={styles.ingredients}>
            {ingredients.map((ingredient) => (
              <div key={uuid()} className={styles.ingredient}>
                <div className={styles['ingredient-image']}>
                  <img src={ingredient.image} alt={ingredient.name} />
                </div>
                <span className={styles['ingredient-name']}>{ingredient.name}</span>
                <div className={styles['ingredient-price']}>
                  <span className="text text_type_digits-default">{ingredient.count} x&nbsp;</span>
                  <Price price={ingredient.price} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.result}>
        <FormattedDate
          date={new Date(createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <Price price={price} />
      </div>
    </article>
  );
};

export default OrderInfo;
