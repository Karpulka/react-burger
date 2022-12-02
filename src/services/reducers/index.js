import ingredientsReducers from './ingredients';
import orderReducers from './order';
import userReducers from './user';

export const rootReducer = {
  ingredients: ingredientsReducers,
  order: orderReducers,
  user: userReducers,
};
