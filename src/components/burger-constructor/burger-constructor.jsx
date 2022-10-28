import React from 'react';
import AppTabs from '../tabs/tabs';
import AppBurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import styles from './burger-constructor.module.css';
import { mocks } from '../../utils/data';

const ingredientTypes = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
};

const filteringredients = (ingredients = [], type) => {
  return ingredients.filter((item) => item.type === type);
};

function AppBurgerConstructor() {
  const tabs = [
    {
      value: ingredientTypes.bun,
      text: 'Булки',
    },
    {
      value: ingredientTypes.sauce,
      text: 'Соусы',
    },
    {
      value: ingredientTypes.main,
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
              <AppBurgerConstructorList
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

export default AppBurgerConstructor;
