import { IngredientTypes } from '../../components/burger-ingredients/burger-ingredients';
import { updateElementInArrayByIndex } from '../../utils/utils';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/ingredients';

import { IIngredientsStore, IIngredientType } from '../../utils/types';

const initialState: IIngredientsStore = {
  all: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  selected: [],

  currentIngredient: {},
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredientType>) => {
      const ingredient = action.payload;
      const isIngredientBun = ingredient.type === IngredientTypes.bun;
      const isBunInIngridientsIndex = state.selected.findIndex(
        (ingredient) => ingredient.type === IngredientTypes.bun
      );

      if (!isIngredientBun || isBunInIngridientsIndex === -1) {
        state.selected = [...state.selected, ingredient];
        return;
      }

      state.selected = updateElementInArrayByIndex(
        state.selected,
        isBunInIngridientsIndex,
        ingredient
      );
    },
    removeAllIngredients: (state) => {
      state.selected = [];
    },
    removeIngredient: (state, action: PayloadAction<IIngredientType>) => {
      state.selected = state.selected.filter((item) => item.key !== action.payload.key);
    },
    setCurrentIngredient: (state, action: PayloadAction<IIngredientType | {}>) => {
      state.currentIngredient = action.payload ?? {};
    },
    insertIngredient: (
      state,
      action: PayloadAction<{
        targetElementKey: number;
        movingIngredientKey: number;
      }>
    ) => {
      const ingredients = [...state.selected];
      ingredients.splice(
        action.payload.targetElementKey,
        0,
        ingredients.splice(action.payload.movingIngredientKey, 1)[0]
      );
      state.selected = ingredients;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.ingredientsRequest = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.all = action.payload ?? [];
      state.ingredientsFailed = false;
      state.ingredientsRequest = false;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.ingredientsFailed = true;
      state.ingredientsRequest = false;
    });
  },
});

export const {
  addIngredient,
  removeIngredient,
  removeAllIngredients,
  setCurrentIngredient,
  insertIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
