import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients.module.css';
import { mocks } from '../../utils/data';

export const IngredientTypes = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
};

const filteringredients = (ingredients = [], type) => {
  return ingredients.filter((item) => item.type === type);
};

function BurgerIngredients(props) {
  const tabs = [
    {
      value: IngredientTypes.bun,
      text: 'Булки',
    },
    {
      value: IngredientTypes.sauce,
      text: 'Соусы',
    },
    {
      value: IngredientTypes.main,
      text: 'Начинки',
    },
  ];

  return (
    <section className={styles.section}>
      <Tabs tabs={tabs} />
      <div className={styles['custom-scroll']}>
        {tabs.map((tab) => {
          const ingredients = filteringredients(mocks, tab.value);
          const burgerListProps = {
            addIngredient: props.addIngredient,
            selectedIngredients: props.selectedIngredients,
            ingredients: ingredients,
            title: tab.text,
            anchor: tab.value,
          };
          return (
            ingredients && <BurgerIngredientsList {...burgerListProps} key={`${tab.value}-list`} />
          );
        })}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  addIngredient: PropTypes.func,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredients;
