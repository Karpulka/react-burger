import React from 'react';
import PropTypes from 'prop-types';
import AppBurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import AppPrice from '../price/price';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeElementInArrayByIndex } from '../../utils/utils';
import styles from './burger-constructor.module.css';

class AppBurgerConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIngredients: [],
      resultPrice: 0,
    };
  }

  prepareIngredients = () => {
    const bunIndex = this.props.ingredients.findIndex(
      (ingredient) => ingredient.type === IngredientTypes.bun
    );

    if (bunIndex === -1) {
      this.addIngredientsWithoutBun();
      return;
    }

    this.addIngredientsWithBun(bunIndex);
  };

  getResultPrice = (ingredients) => {
    if (ingredients && ingredients.length) {
      return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }

    return 0;
  };

  addIngredientsWithoutBun = () => {
    const currentBunIndex = this.state.selectedIngredients.findIndex(
      (ingredient) => ingredient.type === IngredientTypes.bun
    );

    if (currentBunIndex > -1) {
      const currentLength = this.state.selectedIngredients.length;
      this.setState((prevState) => {
        const updatedIngredients = [].concat(
          prevState.selectedIngredients[0],
          removeElementInArrayByIndex(this.props.ingredients, currentBunIndex),
          prevState.selectedIngredients[currentLength - 1]
        );
        return {
          resultPrice: this.getResultPrice(updatedIngredients),
          selectedIngredients: updatedIngredients,
        };
      });
    } else {
      const updatedIngredients = [...this.props.ingredients];
      this.setState({
        resultPrice: this.getResultPrice(updatedIngredients),
        selectedIngredients: updatedIngredients,
      });
    }
  };

  addIngredientsWithBun = (bunIndex) => {
    const bunTop = Object.assign({}, this.props.ingredients[bunIndex], {
      name: `${this.props.ingredients[bunIndex].name} (верх)`,
    });
    const bunBottom = Object.assign({}, this.props.ingredients[bunIndex], {
      name: `${this.props.ingredients[bunIndex].name} (низ)`,
    });
    const otherIngredients = removeElementInArrayByIndex(this.props.ingredients, bunIndex);
    const updateIngredients = [].concat([bunTop], otherIngredients, [bunBottom]);
    this.setState({
      resultPrice: this.getResultPrice(updateIngredients),
      selectedIngredients: updateIngredients,
    });
  };

  componentDidMount() {
    this.prepareIngredients();
  }

  componentDidUpdate(prevProps) {
    if (this.props.ingredients !== prevProps.ingredients) {
      this.prepareIngredients();
    }
  }

  render() {
    return (
      <section className={styles.section}>
        <div className={styles['custom-scroll']}>
          <AppBurgerConstructorList ingredients={this.state.selectedIngredients} />
        </div>
        {this.state.resultPrice > 0 && (
          <div className={`${styles.result}`}>
            <AppPrice price={this.state.resultPrice} />
            <Button type="primary" size="large" htmlType="button">
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
    );
  }
}

AppBurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
};

export default AppBurgerConstructor;
