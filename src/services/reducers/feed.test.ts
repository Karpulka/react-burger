import reducer, { initialState } from './feed';

describe('Feed reducer', () => {
  test('Reducer without additional parameters should return initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
