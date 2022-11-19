import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'order/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/orders`, payload, 'POST');
      if (response.success) {
        const { success, ...orderProps } = response;
        return orderProps;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch post order error', e);
      console.error(e);
      return rejectWithValue('Fetch post order error');
    }
  }
);
