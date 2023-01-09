import React, { FC } from 'react';
import styles from './burger-constructor-list.module.css';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { IIngredientType, IConstructorElement } from '../../utils/types';
import { removeIngredient } from '../../services/reducers/ingredients';
import { useDispatch } from 'react-redux';

interface IBurgerConstructorListProps {
  ingredients: IIngredientType[];
  isLastPart?: boolean;
}

const BurgerConstructorList: FC<IBurgerConstructorListProps> = (props) => {
  const dispatch = useDispatch();

  const onDeleteClick = (ingredient: IIngredientType) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <>
      {props.ingredients && props.ingredients.length ? (
        <div className={styles.list}>
          {props.ingredients.map((ingredient, key) => {
            let elementProps: IConstructorElement = {
              text: ingredient.name,
              thumbnail: ingredient.image_mobile,
              price: ingredient.price,
              key: ingredient.key,
            };
            const isBun = ingredient.type === IngredientTypes.bun;
            let classValue = '';

            if (key === 0 && isBun && !props.isLastPart) {
              elementProps.type = 'top';
              elementProps.isLocked = true;
              classValue = styles['first-item'];
            } else if (key === props.ingredients.length - 1 && isBun) {
              elementProps.type = 'bottom';
              elementProps.isLocked = true;
              classValue = styles['last-item'];
            } else {
              elementProps.handleClose = onDeleteClick.bind({}, ingredient);
            }

            return (
              <div key={ingredient.key} className={`${classValue} constructor__item`}>
                <BurgerConstructorItem ingredient={elementProps} classValue={classValue} />
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

BurgerConstructorList.defaultProps = {
  isLastPart: false,
};

export default BurgerConstructorList;
