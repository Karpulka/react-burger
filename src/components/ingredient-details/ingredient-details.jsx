import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentIngredient } from '../../services/reducers/ingredients';
import { getIngredients } from '../../services/actions/ingredients';

function IngredientDetails(props) {
  const { ingredientId } = useParams();
  const { currentIngredient, all } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!all || !all.length) {
      dispatch(getIngredients());
    } else {
      const ingredient = all.find((item) => item._id === ingredientId);
      ingredient && dispatch(setCurrentIngredient(ingredient));
    }
  }, [all, dispatch, ingredientId]);

  const { name, proteins, fat, carbohydrates, calories, image_large } = currentIngredient;

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
}

IngredientDetails.propTypes = {
  header: PropTypes.string,
};

export default IngredientDetails;
