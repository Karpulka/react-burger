import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

interface ITabsProps {
  tabs: {
    value: string;
    text: string;
  }[];
  onTabChange?: (tabValue: string) => void;
  current?: string;
}

const Tabs: FC<ITabsProps> = ({ tabs, onTabChange, current }) => {
  const isTabs = tabs && tabs.length;

  const onTabClick = (tabValue: string) => {
    onTabChange && onTabChange(tabValue);
  };

  return (
    <>
      {isTabs && (
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            return (
              <Tab
                value={tab.value}
                active={current === tab.value}
                onClick={onTabClick.bind({}, tab.value)}
                key={tab.value}>
                {tab.text}
              </Tab>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tabs;
