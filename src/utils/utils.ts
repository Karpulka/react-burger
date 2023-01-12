import { IIngredientType, IUser } from './types';
import { IngredientTypes } from '../components/burger-ingredients/burger-ingredients';

export const updateElementInArrayByIndex = <T>(
  array: T[],
  elementIndex: number,
  newElement: T
): T[] => {
  const result: T[] = [];
  return result.concat(array.slice(0, elementIndex), newElement, array.slice(elementIndex + 1));
};

export const removeElementInArrayByIndex = <T>(array: T[], elementIndex: number): T[] | [] => {
  const result: T[] = [];
  return result.concat(array.slice(0, elementIndex), array.slice(elementIndex + 1));
};

export const logout = <T extends IUser>(state: T) => {
  state.user = {};
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
};

export const getResultPrice = (ingredients: IIngredientType[]): number => {
  if (ingredients && ingredients.length) {
    return ingredients.reduce((sum, ingredient) => {
      const price =
        ingredient.type === IngredientTypes.bun ? ingredient.price * 2 : ingredient.price;
      return sum + price;
    }, 0);
  }

  return 0;
};
