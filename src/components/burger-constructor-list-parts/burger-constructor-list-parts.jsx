import React from 'react';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import { IngredientTypes } from '../burger-ingredients/burger-ingredients';
import styles from './burger-constructor-list-parts.module.css';
import { removeElementInArrayByIndex } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/reducers/ingredients';

function BurgerConstructorListParts() {
  const { selected: selectedIngredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const prepareIngredients = () => {
    const bunIndex = selectedIngredients.findIndex(
      (ingredient) => ingredient.type === IngredientTypes.bun
    );

    if (bunIndex === -1) {
      return selectedIngredients;
    }

    return addIngredientsWithBun(bunIndex);
  };

  const addIngredientsWithBun = (bunIndex) => {
    const bunTop = Object.assign({}, selectedIngredients[bunIndex], {
      name: `${selectedIngredients[bunIndex].name} (верх)`,
    });
    const bunBottom = Object.assign({}, selectedIngredients[bunIndex], {
      name: `${selectedIngredients[bunIndex].name} (низ)`,
    });
    const otherIngredients = removeElementInArrayByIndex(selectedIngredients, bunIndex);
    return [].concat([bunTop], otherIngredients, [bunBottom]);
  };

  const ingredients = prepareIngredients();
  const isIngredients = ingredients && ingredients.length;
  const isBun =
    isIngredients && ingredients.find((ingredient) => ingredient.type === IngredientTypes.bun);

  const isFirstPartIngredients = isIngredients && ingredients[0].type === IngredientTypes.bun;
  const firstPartIngredients = isFirstPartIngredients ? [ingredients[0]] : [];

  const isBunIngredientsValue =
    isIngredients && ingredients.length > 2 ? ingredients.slice(1, ingredients.length - 1) : [];
  const centralPart = isBun ? isBunIngredientsValue : ingredients;

  const isLastPartIngredients =
    isIngredients && ingredients[ingredients.length - 1].type === IngredientTypes.bun;
  const lastPartIngredients = isLastPartIngredients ? [ingredients[ingredients.length - 1]] : [];

  const [props, dropTarget] = useDrop({
    accept: 'ingredient',
    // collect: (monitor) => {
    //   console.log(dropTarget);
    //   return {
    //     isHover: monitor.isOver(),
    //     type: monitor,
    //   };
    // },
    drop(ingredient) {
      console.log(props);
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <>
      <BurgerConstructorList ingredients={firstPartIngredients} />
      <div className={styles['custom-scroll']} ref={dropTarget}>
        <BurgerConstructorList ingredients={centralPart} />
      </div>
      <BurgerConstructorList ingredients={lastPartIngredients} isLastPart={true} />
    </>
  );
}

export default BurgerConstructorListParts;
