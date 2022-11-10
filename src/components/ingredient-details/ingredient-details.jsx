import React from 'react';
import styles from './ingredient-details.module.css';
import { IngredientType } from '../../utils/types';

function IngredientDetails(props) {
  const { name, proteins, fat, carbohydrates, calories, image_large, _id } = props;
  const info = [
    { title: 'Калории, ккал', value: calories, code: 'calories' },
    { title: 'Белки, г', value: proteins, code: 'proteins' },
    { title: 'Жиры, г', value: fat, code: 'fat' },
    { title: 'Углеводы, г', value: carbohydrates, code: 'carbohydrates' },
  ];
  return (
    <div className={styles.ingredient}>
      {image_large && <img src={image_large} alt={name} className={styles.image} />}
      {name && <div className="text text_type_main-medium">{name}</div>}
      <div className={styles.info}>
        {info.map((item) => {
          if (item.value) {
            return (
              <div className={styles['info-item']} key={`${item.code}-${_id}`}>
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

IngredientDetails.propTypes = IngredientType;

export default IngredientDetails;
