import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { insertIngredient } from '../../services/reducers/ingredients';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructorItem(props) {
  const { ingredient } = props;
  const dispatch = useDispatch();
  const { selected: selectedIngredients } = useSelector((state) => state.ingredients);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'selected-ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = selectedIngredients.findIndex((item) => item.key === ingredient.key);

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        insertIngredient({
          movingIngredientKey: dragIndex,
          targetElementKey: hoverIndex,
        })
      );

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'selected-ingredient',
    item: () => {
      const index = selectedIngredients.findIndex((item) => item.key === ingredient.key);
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div className={styles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {!ingredient.type && <DragIcon type="primary" />}
      <ConstructorElement {...ingredient} />
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerConstructorItem;
