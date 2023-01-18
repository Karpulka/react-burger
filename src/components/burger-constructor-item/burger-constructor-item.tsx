import React, { useRef, FC } from 'react';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { insertIngredient } from '../../services/reducers/ingredients';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IIngredientType, IConstructorElement } from '../../utils/types';
import type { Identifier } from 'dnd-core';

interface IBurgerConstructorItemProps {
  ingredient: IConstructorElement;
  classValue?: string;
}

interface IDragObject {
  index: number;
}

interface ICollectedProps {
  handlerId: Identifier | null;
}

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = (props) => {
  const { ingredient } = props;
  const dispatch = useAppDispatch();
  const { selected: selectedIngredients } = useAppSelector((state) => state.ingredients);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<IDragObject, undefined, ICollectedProps>({
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
      const hoverIndex = selectedIngredients.findIndex(
        (item: IIngredientType) => item.key === ingredient.key
      );

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

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
      const index = selectedIngredients.findIndex(
        (item: IIngredientType) => item.key === ingredient.key
      );
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
};

export default BurgerConstructorItem;
