import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  removeAllIngredients,
  setCurrentIngredient,
  insertIngredient,
} from './ingredients';
import {
  ingredientItem,
  ingredientItem1,
  ingredientItem2,
  previousIngredientsStateWithoutSelectedBun,
  previousIngredientsStateWithSelectedBun,
  previousIngredientsState,
  mocks as ingredients,
} from '../../utils/data';
import { getIngredients } from '../actions/ingredients';

describe('Ingredients reducer', () => {
  test('Reducer without additional parameters should return initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Reducer addIngredient when it is not type BUN in state.selected', () => {
    const previosSeletedIngredientsCount =
      previousIngredientsStateWithoutSelectedBun.selected.length;

    const updatedState = reducer(
      previousIngredientsStateWithoutSelectedBun,
      addIngredient(ingredientItem)
    );
    expect(updatedState.selected.length).toEqual(previosSeletedIngredientsCount + 1);
  });

  test('Reducer addIngredient when it is  type BUN in state.selected', () => {
    const previosSeletedIngredientsCount = previousIngredientsStateWithSelectedBun.selected.length;

    const updatedState = reducer(
      previousIngredientsStateWithSelectedBun,
      addIngredient(ingredientItem)
    );
    expect(updatedState.selected.length).toEqual(previosSeletedIngredientsCount);
  });

  test('Reducer removeAllIngredients', () => {
    const updatedState = reducer(previousIngredientsStateWithSelectedBun, removeAllIngredients());
    expect(updatedState.selected.length).toEqual(0);
  });

  test('Reducer removeIngredient', () => {
    const previosSeletedIngredientsCount = previousIngredientsStateWithSelectedBun.selected.length;

    const updatedState = reducer(
      previousIngredientsStateWithSelectedBun,
      removeIngredient(ingredientItem)
    );
    expect(updatedState.selected.length).toEqual(previosSeletedIngredientsCount - 1);
  });

  test('Reducer setCurrentIngredient', () => {
    const updatedState = reducer(initialState, setCurrentIngredient(ingredientItem));
    expect(updatedState.currentIngredient).toEqual(ingredientItem);
  });

  test('Reducer setCurrentIngredient empty, previos current ingredient is not empty', () => {
    const updatedState = reducer(previousIngredientsState, setCurrentIngredient({}));
    expect(updatedState.currentIngredient).toEqual({});
  });

  test('Reducer insertIngredient', () => {
    const ingredientsCount = previousIngredientsState.selected.length;
    let state = previousIngredientsState;
    if (ingredientsCount < 2) {
      state = reducer(state, addIngredient(ingredientItem1));
      state = reducer(state, addIngredient(ingredientItem2));
    }

    const firstIngredient = state.selected[0];
    const secondIngredient = state.selected[1];

    const updatedState = reducer(
      previousIngredientsState,
      insertIngredient({
        targetElementKey: 0,
        movingIngredientKey: 1,
      })
    );
    expect(updatedState.selected[0]).toEqual(secondIngredient);
    expect(updatedState.selected[1]).toEqual(firstIngredient);
  });

  test('Reducer getIngredients fulfilled', async () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients,
    };

    expect(
      reducer(
        {
          ...initialState,
          ingredientsFailed: true,
          ingredientsRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      all: ingredients,
    });
  });

  test('Reducer getIngredients pending', async () => {
    const action = {
      type: getIngredients.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  test('Reducer getIngredients rejected', async () => {
    const action = {
      type: getIngredients.rejected.type,
    };

    expect(reducer({ ...initialState, ingredientsRequest: true }, action)).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
});
