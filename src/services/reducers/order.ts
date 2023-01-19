import { createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrderInfo } from '../actions/order';

import { IOrderStore } from '../../utils/types';

export const initialState: IOrderStore = {
  newOrder: {},
  orderRequest: false,
  orderFailed: false,

  getOrderInfoRequest: false,
  getOrderInfoFailed: false,
  orderInfo: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.newOrder = action.payload ?? {};
      state.orderFailed = false;
      state.orderRequest = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.orderFailed = true;
      state.orderRequest = false;
    });
    builder.addCase(getOrderInfo.pending, (state) => {
      state.orderInfo = null;
      state.getOrderInfoRequest = true;
    });
    builder.addCase(getOrderInfo.fulfilled, (state, action) => {
      state.orderInfo = action.payload ?? null;
      state.getOrderInfoFailed = false;
      state.getOrderInfoRequest = false;
    });
    builder.addCase(getOrderInfo.rejected, (state) => {
      state.getOrderInfoFailed = true;
      state.getOrderInfoRequest = false;
      state.orderInfo = null;
    });
  },
});

export const { clearNewOrder } = orderSlice.actions;

export type TOrderActions = ReturnType<typeof clearNewOrder>;

export default orderSlice.reducer;
