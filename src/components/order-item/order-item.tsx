import React, { FC } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import styles from './order-item.module.css';
import { IIngredientType, IOrdersAllItem } from '../../utils/types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getResultPrice } from '../../utils/utils';
import { useHistory, useLocation } from 'react-router-dom';

const OrderItem: FC<IOrdersAllItem> = (params) => {
  const { all: allIngredients } = useAppSelector((state) => state.ingredients);

  const history = useHistory();
  const location = useLocation();

  if (!params.number) {
    return null;
  }

  const { ingredients: ingredientsIds, number, createdAt, name } = params;

  const showedIngredientsCount = 6;
  let lastIngredientsCount = 0;
  let showedIngredients = ingredientsIds.slice().reverse();

  if (ingredientsIds.length > showedIngredientsCount) {
    lastIngredientsCount = ingredientsIds.length - showedIngredientsCount;
    showedIngredients = showedIngredients.splice(0, showedIngredientsCount);
  }

  const ingredients = showedIngredients.map(
    (ingredientId) => allIngredients.find((item) => item._id === ingredientId) as IIngredientType
  );

  const price = getResultPrice(ingredients);

  const openInfo = () => {
    history.push({
      pathname: `${location.pathname}/${number}`,
    });
  };

  return (
    <article className={styles.order} onClick={openInfo}>
      <div className={styles.top}>
        <div className="text text_type_digits-default">#{number}</div>
        <FormattedDate
          date={new Date(createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <div className="text_type_main-medium">{name}</div>
      <div className={styles.bottom}>
        <div className={styles.ingredients}>
          {ingredients.map((ingredient, index) => {
            if (ingredient) {
              return (
                <div className={styles.ingredient} key={`${ingredient._id}-${index}`}>
                  <img src={ingredient.image} alt={ingredient.name} />
                  {index === 0 && lastIngredientsCount ? (
                    <span className={styles.lastIngredientsCount}>+{lastIngredientsCount}</span>
                  ) : (
                    ''
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
        <Price price={price} />
      </div>
    </article>
  );
};

export default OrderItem;
