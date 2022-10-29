import React from 'react';
import AppTabs from '../tabs/tabs';
import AppBurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
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

function AppBurgerIngredients() {
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
      <AppTabs tabs={tabs} />
      <div className={styles['custom-scroll']}>
        {tabs.map((tab) => {
          const ingredients = filteringredients(mocks, tab.value);
          return (
            ingredients && (
              <AppBurgerIngredientsList
                ingredients={ingredients}
                title={tab.text}
                anchor={tab.value}
                key={`${tab.value}-list`}
              />
            )
          );
        })}
      </div>
    </section>
  );
}

export default AppBurgerIngredients;
