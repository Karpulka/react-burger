import React, { useState, FC, useEffect } from 'react';
import styles from './sidebar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
import { INavigationItem } from '../../utils/types';
import { useLocation } from 'react-router-dom';

interface ISidebarProps {
  navigation: INavigationItem[];
  initialActive?: string;
}

const Sidebar: FC<ISidebarProps> = (props) => {
  let { navigation, initialActive } = props;
  initialActive = initialActive ? initialActive : navigation[0].value;
  const [current, setCurrent] = useState(initialActive);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const currentPage = navigation.find((item) => location.pathname === item.link);
    currentPage && setCurrent(currentPage.value);
  }, [location]);

  const onTabClick = (item: INavigationItem) => {
    const { value, link, onSelectTab } = item;
    setCurrent(value);
    onSelectTab && onSelectTab();
    if (link) {
      location.pathname = link;
      history.push(link);
    }
  };

  return (
    <section className={`${styles.sidebar} sidebar`}>
      {navigation && navigation.length && (
        <nav>
          {navigation.map((item) => (
            <Tab
              active={item.value === current}
              value={item.value}
              key={item.value}
              onClick={onTabClick.bind({}, item)}>
              {item.title}
            </Tab>
          ))}
        </nav>
      )}
      <div className={styles.description}>
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </section>
  );
};

export default Sidebar;
