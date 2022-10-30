import React from 'react';
import Price from '../price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import styles from './burger-ingredients-item.module.css';

class BurgerIngredientsItem extends React.Component {
  state = {
    count: 0,
  };

  onClick = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { image, name, price, _id } = this.props;
    return (
      <div className={`${styles.ingredient} ingredient__item`} onClick={this.onClick} id={_id}>
        <img src={image} alt={name} className={styles.image} />

        <Price price={price} />
        <div className={styles.name}>{name}</div>
        {this.state.count > 0 && <Counter count={this.state.count} size="default" />}
      </div>
    );
  }
}

BurgerIngredientsItem.propTypes = IngredientType;

export default BurgerIngredientsItem;
