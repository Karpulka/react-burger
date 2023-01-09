import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price.module.css';

interface IPriceProps {
  price: number;
}

const Price: FC<IPriceProps> = (props) => {
  return (
    <div className={styles.price}>
      <span className="mr-2">{props.price}</span> <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
