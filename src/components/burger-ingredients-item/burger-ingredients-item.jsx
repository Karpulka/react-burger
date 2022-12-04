import React from 'react';
import Price from '../price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-item.module.css';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

function BurgerIngredientsItem(props) {
  const { image, name, price, _id: ingredientId } = props.ingredient;
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: props.ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={`${styles.ingredient} ingredient__item`}
      onClick={props.ingredientClick.bind({}, props.ingredient)}
      style={{ opacity }}>
      <div ref={ref} className={styles.content}>
        <img src={image} alt={name} className={styles.image} />
        <Price price={price} />
        <div className={styles.name}>{name}</div>
      </div>
      {props.count > 0 && <Counter count={props.count} size="default" />}
    </Link>
  );
}

BurgerIngredientsItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  ingredientClick: PropTypes.func,
  count: PropTypes.number,
};
export default BurgerIngredientsItem;
