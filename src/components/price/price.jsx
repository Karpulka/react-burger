import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

function AppPrice(props) {
  return (
    <div className={styles.price}>
      <span className="mr-2">{props.price}</span> <CurrencyIcon type="primary" />
    </div>
  );
}

AppPrice.propTypes = {
  price: PropTypes.number.isRequired,
};

export default AppPrice;
