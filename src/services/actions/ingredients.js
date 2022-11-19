import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/ingredients`);
      if (response.data.length) {
        return response.data;
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
