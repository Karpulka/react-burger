import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';

class AppBurgerIngredientsItem extends React.Component {
  state = {
    count: 0,
  };

  onClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { image, name, price } = this.props;
    return (
      <div className={styles.ingredient} onClick={this.onClick}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.price}>
          <span className="mr-2">{price}</span> <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}>{name}</div>
        {this.state.count > 0 && <Counter count={this.state.count} size="default" />}
      </div>
    );
  }
}

AppBurgerIngredientsItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
};

export default AppBurgerIngredientsItem;
