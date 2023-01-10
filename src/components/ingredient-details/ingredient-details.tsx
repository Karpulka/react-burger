import React, { useEffect, FC } from 'react';
import styles from './ingredient-details.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import { setCurrentIngredient } from '../../services/reducers/ingredients';
import { IIngredientType } from '../../utils/types';

interface IIngredientDetails {
  header?: string;
}

const IngredientDetails: FC<IIngredientDetails> = (props) => {
  const { ingredientId } = useParams();
  const { currentIngredient, all } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (all && all.length) {
      const ingredient = all.find((item: IIngredientType) => item._id === ingredientId);
      ingredient && dispatch(setCurrentIngredient(ingredient));
    }
  }, [all, dispatch, ingredientId]);

  const { name, proteins, fat, carbohydrates, calories, image_large } =
    currentIngredient as IIngredientType;

  const info = [
    { title: 'Калории, ккал', value: calories, code: 'calories' },
    { title: 'Белки, г', value: proteins, code: 'proteins' },
    { title: 'Жиры, г', value: fat, code: 'fat' },
    { title: 'Углеводы, г', value: carbohydrates, code: 'carbohydrates' },
  ];

  if (!Object.keys(currentIngredient).length) {
    return null;
  }

  return (
    <div className={styles.ingredient}>
      {props.header && <div className="text text_type_main-large mt-30">{props.header}</div>}
      {image_large && <img src={image_large} alt={name} className={styles.image} />}
      {name && <div className="text text_type_main-medium">{name}</div>}
      <div className={styles.info}>
        {info.map((item) => {
          if (item.value) {
            return (
              <div className={styles['info-item']} key={`${item.code}-${ingredientId}`}>
                {item.title}
                <span className={styles['info-value']}>{item.value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default IngredientDetails;
