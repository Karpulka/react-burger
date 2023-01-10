import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrderResponse } from '../../utils/types';
import { Omit } from 'utility-types';

interface ICreateOrderPayload {
  ingredients: string[];
}

type ICreateOrderActionResponse = Omit<IOrderResponse, 'success'>;

export const createOrder = createAsyncThunk<ICreateOrderActionResponse, ICreateOrderPayload>(
  'order/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response: IOrderResponse = await apiRequest(`/orders`, payload, 'POST');
      if (response.success) {
        const { success, ...orderProps } = response;
        return orderProps as ICreateOrderActionResponse;
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
