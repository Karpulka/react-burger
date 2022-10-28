import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const onClick = (anchor, setCurrent) => {
  const element = document.getElementById(anchor);
  element.scrollIntoView({
    behavior: 'smooth',
  });
  setCurrent(anchor);
};

function AppTabs({ tabs }) {
  const isTabs = tabs && tabs.length;
  const [current, setCurrent] = React.useState(tabs[0].value);

  return (
    <>
      {isTabs && (
        <div style={{ display: 'flex' }}>
          {tabs.map((tab) => {
            const anchor = tab.value;
            return (
              <Tab
                value={tab.value}
                active={current === tab.value}
                onClick={onClick.bind(this, anchor, setCurrent)}
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

AppTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default AppTabs;
