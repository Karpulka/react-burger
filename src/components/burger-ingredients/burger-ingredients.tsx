import React, { useState, useRef, FC } from 'react';
import Tabs from '../tabs/tabs';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';
import styles from './burger-ingredients.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IIngredientType } from '../../utils/types';

export const IngredientTypes = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
};

const filteringredients = (ingredients: IIngredientType[] = [], type: string) => {
  return ingredients.filter((item) => item.type === type);
};

const BurgerIngredients: FC = () => {
  const { all: allIngredients } = useAppSelector((state) => state.ingredients);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<string>(IngredientTypes.bun);
  const tabRefs: HTMLDivElement[] = [];

  let scrollBlockTop = 0;

  const onScrollBlock = () => {
    const targetValue = 0;
    scrollBlockTop =
      scrollBlockRef.current && scrollBlockTop === 0
        ? scrollBlockRef.current.getBoundingClientRect().top
        : scrollBlockTop;
    const sortTabsByTop = [...tabRefs].sort((currentTab, prevTab) => {
      const { top: prevTop } = prevTab.getBoundingClientRect();
      const { top: currentTop } = currentTab.getBoundingClientRect();

      return (
        Math.abs(targetValue - currentTop + scrollBlockTop) -
        Math.abs(targetValue - prevTop + scrollBlockTop)
      );
    });

    const tabValue = sortTabsByTop[0].getAttribute('id');
    if (tabValue && tabValue !== currentTab) {
      setCurrentTab(tabValue);
    }
  };

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

  const onTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    const tabIndex = tabs.findIndex((tab) => tab.value === tabValue);
    if (tabIndex > -1) {
      tabRefs[tabIndex].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <Tabs tabs={tabs} onTabChange={onTabChange} current={currentTab} />
      <div className={styles['custom-scroll']} onScroll={onScrollBlock} ref={scrollBlockRef}>
        {tabs.map((tab, key) => {
          const ingredients = filteringredients(allIngredients, tab.value);
          const burgerListProps = {
            ingredients: ingredients,
            title: tab.text,
          };
          return (
            ingredients && (
              <div
                ref={(tabRef: HTMLDivElement) => (tabRefs[key] = tabRef)}
                key={`${tab.value}-list`}
                id={tab.value}>
                <BurgerIngredientsList {...burgerListProps} />
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export default BurgerIngredients;
