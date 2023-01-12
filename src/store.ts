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
import { TIngredientsActions } from './services/reducers/ingredients';
import { TOrderActions } from './services/reducers/order';
import { TUserActions } from './services/reducers/user';

import { ThunkAction } from 'redux-thunk';
import type {} from 'redux-thunk/extend-redux';

const wsActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
};

const liveFeedMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveFeedMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = TFeedActions | TIngredientsActions | TOrderActions | TUserActions;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;
