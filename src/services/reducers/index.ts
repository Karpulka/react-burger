import { combineReducers } from 'redux';
import ingredientsReducers from './ingredients';
import orderReducers from './order';
import userReducers from './user';
import feedReducers from './feed';
import personalOrdersReducers from './personal-orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  order: orderReducers,
  user: userReducers,
  feed: feedReducers,
  personalOrders: personalOrdersReducers,
});
