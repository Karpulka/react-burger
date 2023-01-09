import { IUser } from './types';

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
