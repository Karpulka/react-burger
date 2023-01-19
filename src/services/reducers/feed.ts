import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrdersAll, IOrdersAllItem, WebsocketStatus } from '../../utils/types';

type TFeedStore = {
  status: WebsocketStatus;
  connectionError: string;
  orders: IOrdersAllItem[];
  total: number;
  totalToday: number;
};

export const initialState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<string>) => {},
    disconnect: () => {},
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = '';
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsMessage: (state, action: PayloadAction<IOrdersAll>) => {
      const { orders, total, totalToday } = action.payload;
      const oldOrders = state.orders.slice();
      const updatedOrders = state.orders.concat(orders);

      const filteredOrders = updatedOrders.filter((order) => {
        const orderDuplicateIndex = oldOrders.findIndex((item) => item._id === order._id);

        if (orderDuplicateIndex > -1) {
          oldOrders[orderDuplicateIndex] = order;
          return;
        }

        return true;
      });

      state.orders = filteredOrders.concat(oldOrders);
      state.total = total;
      state.totalToday = totalToday;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
  },
});

export const { connect, disconnect, wsConnecting, wsError, wsClose, wsOpen, wsMessage } =
  feedSlice.actions;

export type TFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;

export default feedSlice.reducer;
