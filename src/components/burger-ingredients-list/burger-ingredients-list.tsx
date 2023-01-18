import React, { useMemo, FC } from 'react';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { IIngredientType } from '../../utils/types';
import styles from './burger-ingredients-list.module.css';
import { setCurrentIngredient } from '../../services/reducers/ingredients';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

interface IBurgerIngredientsListProps {
  title: string;
  ingredients: IIngredientType[];
}

const BurgerIngredientsList: FC<IBurgerIngredientsListProps> = ({ title, ingredients }) => {
  const { selected: selectedIngredients } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  const onIngredientClick = (ingredient: IIngredientType) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const ingredientCount = useMemo(
    () => (ingredientId: string) => {
      return selectedIngredients.reduce(
        (count: number, ingredient: IIngredientType) =>
          ingredient._id === ingredientId ? count + 1 : count,
        0
      );
    },
    [selectedIngredients]
  );

  return (
    <>
      <div className={styles.ingredients}>
        <h2 className="text text_type_main-medium">{title}</h2>
        <div className={styles.list}>
          {ingredients.map((ingredient) => {
            return (
              <BurgerIngredientsItem
                ingredient={ingredient}
                ingredientClick={onIngredientClick}
                count={ingredientCount(ingredient._id)}
                key={ingredient._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BurgerIngredientsList;
