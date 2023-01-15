import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './services/reducers';

import { socketMiddleware } from './services/middlewares/socket-middleware';
import {
  connect as FeedWsConnect,
  disconnect as FeedWsDisconnect,
  wsConnecting as FeedWsConnecting,
  wsError as FeedWsError,
  wsClose as FeedWsClose,
  wsOpen as FeedWsOpen,
  wsMessage as FeedWsMessage,
  TFeedActions,
} from './services/reducers/feed';
import {
  connect as PersonalOrdersWsConnect,
  disconnect as PersonalOrdersWsDisconnect,
  wsConnecting as PersonalOrdersWsConnecting,
  wsError as PersonalOrdersWsError,
  wsClose as PersonalOrdersWsClose,
  wsOpen as PersonalOrdersWsOpen,
  wsMessage as PersonalOrdersWsMessage,
  TPersonalOrdersActions,
} from './services/reducers/personal-orders';
import { TIngredientsActions } from './services/reducers/ingredients';
import { TOrderActions } from './services/reducers/order';
import { TUserActions } from './services/reducers/user';

import { ThunkAction } from 'redux-thunk';
import type {} from 'redux-thunk/extend-redux';

const wsFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
};

const wsPersonalOrdersActions = {
  wsConnect: PersonalOrdersWsConnect,
  wsDisconnect: PersonalOrdersWsDisconnect,
  wsConnecting: PersonalOrdersWsConnecting,
  onOpen: PersonalOrdersWsOpen,
  onClose: PersonalOrdersWsClose,
  onError: PersonalOrdersWsError,
  onMessage: PersonalOrdersWsMessage,
};

const liveFeedMiddleware = socketMiddleware(wsFeedActions);
const livePersonalOrdersMiddleware = socketMiddleware(wsPersonalOrdersActions);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveFeedMiddleware, livePersonalOrdersMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions =
  | TFeedActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TPersonalOrdersActions;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;
