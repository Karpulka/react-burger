import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../actions/order';

import { IOrderStore } from '../../utils/types';

const initialState: IOrderStore = {
  newOrder: {},
  orderRequest: false,
  orderFailed: false,
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
  },
});

export const { clearNewOrder } = orderSlice.actions;

export type TOrderActions = ReturnType<typeof clearNewOrder>;

export default orderSlice.reducer;
