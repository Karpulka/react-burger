import reducer, {
  initialState,
  resetIsForgotPasswordSuccess,
  resetIsResetPasswordSuccess,
} from './user';

describe('Ingredients reducer', () => {
  test('Reducer without additional parameters should return initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Reducer resetIsForgotPasswordSuccess', () => {
    const previousState = { ...initialState, isForgotPasswordSuccess: true };
    expect(reducer(previousState, resetIsForgotPasswordSuccess()).isForgotPasswordSuccess).toEqual(
      false
    );
  });

  test('Reducer resetIsResetPasswordSuccess', () => {
    const previousState = { ...initialState, isResetPasswordSuccess: true };
    expect(reducer(previousState, resetIsResetPasswordSuccess()).isResetPasswordSuccess).toEqual(
      false
    );
  });
});
