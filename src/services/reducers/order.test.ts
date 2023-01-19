import reducer, { initialState, clearNewOrder } from './order';
import { order } from '../../utils/data';

describe('Order reducer', () => {
  test('Reducer without additional parameters should return initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Reducer clearNewOrder', () => {
    const previousState = { ...initialState, newOrder: { order } };
    const updatedState = reducer(previousState, clearNewOrder());
    expect(updatedState.newOrder).toEqual({});
  });
});
