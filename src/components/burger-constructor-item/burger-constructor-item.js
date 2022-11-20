import React from 'react';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { insertIngredient } from '../../services/reducers/ingredients';
import { useDispatch } from 'react-redux';
// import { insertElementToArrayAfterIndex } from '../../utils/utils';

function BurgerConstructorItem(props) {
  const { ingredient } = props;
  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: 'selected-ingredient',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'selected-ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(movingIngredient) {
      console.log(isHover);
      // console.log(movingIngredient);
      // console.log(insertElementToArrayAfterIndex(selected, movingIngredient, ingredient));
      dispatch(
        insertIngredient({
          movingIngredientKey: movingIngredient.key,
          targetElementKey: ingredient.key,
        })
      );
    },
  });

  return (
    <div className={styles.item} ref={dropTarget} style={{ opacity }}>
      {!ingredient.type && <DragIcon type="primary" />}
      <div ref={ref}>
        <ConstructorElement {...ingredient} />
      </div>
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerConstructorItem;
