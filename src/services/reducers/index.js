import ingredientsReducers from './ingredients';
import orderReducers from './order';

export const rootReducer = {
  ingredients: ingredientsReducers,
  order: orderReducers,
};
