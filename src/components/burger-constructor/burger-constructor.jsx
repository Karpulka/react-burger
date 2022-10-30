import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import Price from '../price/price';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeElementInArrayByIndex } from '../../utils/utils';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
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
          <BurgerConstructorList
            ingredients={this.state.selectedIngredients}
            removeIngredient={this.props.removeIngredient}
          />
        </div>
        {this.state.resultPrice > 0 && (
          <div className={`${styles.result}`}>
            <Price price={this.state.resultPrice} />
            <Button type="primary" size="large" htmlType="button">
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
    );
  }
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType)),
  removeIngredient: PropTypes.func,
};

export default BurgerConstructor;
