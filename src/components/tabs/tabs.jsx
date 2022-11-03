import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

function Tabs({ tabs, onTabChange }) {
  const isTabs = tabs && tabs.length;
  const [current, setCurrent] = React.useState(tabs[0].value);

  const onTabClick = (tabValue) => {
    setCurrent(tabValue);
    onTabChange(tabValue);
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
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onTabChange: PropTypes.func,
};

export default Tabs;
