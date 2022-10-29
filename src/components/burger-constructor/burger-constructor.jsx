import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import { removeElementInArrayByIndex } from '../../utils/utils';

class AppBurgerConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIngredients: [],
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

  addIngredientsWithoutBun = () => {
    const currentBunIndex = this.state.selectedIngredients.findIndex(
      (ingredient) => ingredient.type === IngredientTypes.bun
    );

    if (currentBunIndex > -1) {
      const currentLength = this.state.selectedIngredients.length;
      this.setState((prevState) => ({
        selectedIngredients: [].concat(
          prevState.selectedIngredients[0],
          removeElementInArrayByIndex(this.props.ingredients, currentBunIndex),
          prevState.selectedIngredients[currentLength - 1]
        ),
      }));
    } else {
      this.setState({
        selectedIngredients: [...this.props.ingredients],
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

    this.setState({
      selectedIngredients: [].concat([bunTop], otherIngredients, [bunBottom]),
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
      <div className="constructor">
        <div className="constructor__list">
          {this.state.selectedIngredients &&
            this.state.selectedIngredients.map((ingredient, key) => {
              let props = {
                text: ingredient.name,
                thumbnail: ingredient.image_mobile,
                price: ingredient.price,
              };
              const isBun = ingredient.type === IngredientTypes.bun;

              if (key === 0 && isBun) {
                props.type = 'top';
                props.isLocked = true;
              }

              if (key === this.state.selectedIngredients.length - 1 && isBun) {
                props.type = 'bottom';
                props.isLocked = true;
              }

              return (
                <div className="constructor__item" key={`${ingredient._id}-${key}`}>
                  <ConstructorElement {...props} />
                </div>
              );
            })}
        </div>
      </div>
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
