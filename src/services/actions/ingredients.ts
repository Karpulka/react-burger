import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetIngredientsResponse, IIngredientType } from '../../utils/types';

export const getIngredients = createAsyncThunk<IIngredientType[], undefined>(
  'ingredients/getIngredients',
  async (payload, { rejectWithValue }) => {
    try {
      const response: IGetIngredientsResponse = await apiRequest(`/ingredients`);
      if (response.data.length) {
        return response.data as IIngredientType[];
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch ingredients error', e);
      console.error(e);
      return rejectWithValue('Fetch ingredients error');
    }
  }
);
