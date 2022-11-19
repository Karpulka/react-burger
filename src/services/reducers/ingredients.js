import { IngredientTypes } from '../../components/burger-ingredients/burger-ingredients';
import { updateElementInArrayByIndex } from '../../utils/utils';
import { v1 as uuid } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/ingredients';

const initialState = {
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
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, key: uuid() };
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
    removeIngredient: (state, action) => {
      state.selected = state.selected.filter((item) => item.key !== action.payload.key);
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload ?? {};
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

export const { addIngredient, removeIngredient, removeAllIngredients, setCurrentIngredient } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
