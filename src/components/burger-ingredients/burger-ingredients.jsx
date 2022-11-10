import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients.module.css';

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

  const tabRefs = [];

  const onTabChange = (tabValue) => {
    const tabIndex = tabs.findIndex((tab) => tab.value === tabValue);
    if (tabIndex > -1) {
      tabRefs[tabIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <Tabs tabs={tabs} onTabChange={onTabChange} />
      <div className={styles['custom-scroll']}>
        {tabs.map((tab, key) => {
          const ingredients = filteringredients(props.allIngredients, tab.value);
          const burgerListProps = {
            ingredients: ingredients,
            title: tab.text,
          };
          return (
            ingredients && (
              <div ref={(tabRef) => (tabRefs[key] = tabRef)} key={`${tab.value}-list`}>
                <BurgerIngredientsList {...burgerListProps} />
              </div>
            )
          );
        })}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  allIngredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
};

export default BurgerIngredients;
