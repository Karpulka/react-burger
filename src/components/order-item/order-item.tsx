import React, { FC } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import styles from './order-item.module.css';
import { IOrder } from '../../utils/types';

const OrderItem: FC<IOrder> = ({ order }) => {
  if (!order) {
    return null;
  }

  const showedIngredientsCount = 6;
  let lastIngredientsCount = order.ingredients.length;
  let showedIngredients = order.ingredients.slice().reverse();

  if (order.ingredients.length > showedIngredientsCount) {
    lastIngredientsCount = order.ingredients.length - showedIngredientsCount;
    showedIngredients = showedIngredients.splice(0, showedIngredientsCount);
  }

  return (
    <article className={styles.order}>
      <div className={styles.top}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <div className="text_type_main-medium">{order.name}</div>
      <div className={styles.bottom}>
        <div className={styles.ingredients}>
          {showedIngredients.map((ingredient, index) => (
            <div className={styles.ingredient} key={`${ingredient._id}-${index}`}>
              <img src={ingredient.image} alt={ingredient.name} />
              {index === 0 && lastIngredientsCount ? (
                <span className={styles.lastIngredientsCount}>+{lastIngredientsCount}</span>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <Price price={order.price} />
      </div>
    </article>
  );
};

export default OrderItem;
