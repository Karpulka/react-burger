import { combineReducers } from 'redux';
import ingredientsReducers from './ingredients';
import orderReducers from './order';
import userReducers from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducers,
  order: orderReducers,
  user: userReducers,
});
