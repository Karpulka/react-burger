import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetOrderInfoResponse, IOrderResponse, IOrdersAllItem } from '../../utils/types';
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

export const getOrderInfo = createAsyncThunk<IOrdersAllItem, string>(
  'order/getInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const response: IGetOrderInfoResponse = await apiRequest(`/orders/${payload}`);
      if (response.success) {
        return response.orders[0] as IOrdersAllItem;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch get order info error', e);
      console.error(e);
      return rejectWithValue('Fetch get order info error');
    }
  }
);
