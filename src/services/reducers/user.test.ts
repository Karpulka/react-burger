import reducer, {
  initialState,
  resetIsForgotPasswordSuccess,
  resetIsResetPasswordSuccess,
} from './user';
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
  getUserInfo,
  updateUserInfo,
} from '../actions/user';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  success: true,
  accessToken: 'access token',
  refreshToken: 'refresh token',
  user: {
    email: 'test@test.ru',
    name: 'test',
  },
};

describe('User reducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  test('Reducer login pending', () => {
    const action = {
      type: login.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });
  test('Reducer login fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: user,
    };

    const updatedState = reducer(
      {
        ...initialState,
        loginRequest: true,
        loginFailed: true,
      },
      action
    );
    expect(updatedState).toEqual({
      ...initialState,
      user: user.user,
    });

    const store = mockStore(initialState);

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(action.payload),
      ok: true,
    });

    return store
      .dispatch(
        login({
          email: user.user.email,
          password: '123456',
        })
      )
      .then(() => {
        const actionFullfilled = store.getActions().find((item) => item.type === action.type);
        // т.к. не можем проверить установку localstorage внтури редьюсера, то проверям,
        // что после fetch приходит ожидаемый payload
        expect(actionFullfilled.payload).toEqual(action.payload);
      });
  });
  test('Reducer login rejected', () => {
    const action = {
      type: login.rejected.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          loginRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      loginFailed: true,
    });
  });

  test('Reducer register pending', () => {
    const action = {
      type: register.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      registerRequest: true,
    });
  });
  test('Reducer register fulfilled', () => {
    const actionType = register.fulfilled.type;
    const payload = user;

    const updatedState = reducer(
      {
        ...initialState,
        registerRequest: true,
        registerFailed: true,
      },
      {
        type: actionType,
        payload,
      }
    );
    expect(updatedState).toEqual({
      ...initialState,
      user: user.user,
    });

    const store = mockStore(initialState);

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(payload),
      ok: true,
    });

    return store
      .dispatch(
        register({
          name: user.user.name,
          email: user.user.email,
          password: '123456',
        })
      )
      .then(() => {
        const actionFullfilled = store.getActions().find((item) => item.type === actionType);
        // т.к. не можем проверить установку localstorage внтури редьюсера, то проверям,
        // что после fetch приходит ожидаемый payload
        expect(actionFullfilled.payload).toEqual(payload);
      });
  });
  test('Reducer register rejected', () => {
    const action = {
      type: register.rejected.type,
    };

    expect(
      reducer(
        {
          ...initialState,
          registerRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      registerFailed: true,
    });
  });

  test('Reducer forgotPassword pending', () => {
    const action = {
      type: forgotPassword.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
    });
  });
  test('Reducer forgotPassword fulfilled', () => {
    const action = {
      type: forgotPassword.fulfilled.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          forgotPasswordFailed: true,
          forgotPasswordRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      isForgotPasswordSuccess: true,
    });
  });
  test('Reducer forgotPassword rejected', () => {
    const action = {
      type: forgotPassword.rejected.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          forgotPasswordRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      forgotPasswordFailed: true,
    });
  });

  test('Reducer resetPassword pending', () => {
    const action = {
      type: resetPassword.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: true,
    });
  });
  test('Reducer resetPassword fulfilled', () => {
    const action = {
      type: resetPassword.fulfilled.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          resetPasswordFailed: true,
          resetPasswordRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      isResetPasswordSuccess: true,
    });
  });
  test('Reducer resetPassword rejected', () => {
    const action = {
      type: resetPassword.rejected.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          resetPasswordRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      resetPasswordFailed: true,
    });
  });

  test('Reducer logout pending', () => {
    const action = {
      type: logout.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });
  test('Reducer logout fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
    };
    expect(
      reducer({ ...initialState, logoutFailed: true, logoutRequest: true, user: user.user }, action)
    ).toEqual(initialState);
  });
  test('Reducer logout rejected', () => {
    const action = {
      type: logout.rejected.type,
    };
    expect(reducer({ ...initialState, logoutRequest: true, user: user.user }, action)).toEqual({
      ...initialState,
      logoutFailed: true,
    });
  });

  test('Reducer refreshToken pending', () => {
    const action = {
      type: refreshToken.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      refreshTokenRequest: true,
    });
  });
  test('Reducer refreshToken fulfilled', () => {
    const actionType = refreshToken.fulfilled.type;
    const payload = {
      success: true,
      accessToken: 'access token',
      refreshToken: 'refresh token',
    };

    expect(
      reducer(
        {
          ...initialState,
          refreshTokenFailed: true,
          refreshTokenRequest: true,
        },
        {
          type: actionType,
          payload,
        }
      )
    ).toEqual(initialState);

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(payload),
      ok: true,
    });

    const store = mockStore(initialState);

    return store.dispatch(refreshToken()).then(() => {
      const actionFullfilled = store.getActions().find((item) => item.type === actionType);
      // т.к. не можем проверить установку localstorage внтури редьюсера, то проверям,
      // что после fetch приходит ожидаемый payload
      expect(actionFullfilled.payload).toEqual(payload);
    });
  });
  test('Reducer refreshToken rejected', () => {
    const action = {
      type: refreshToken.rejected.type,
    };
    expect(
      reducer({ ...initialState, refreshTokenRequest: true, user: user.user }, action)
    ).toEqual({
      ...initialState,
      refreshTokenFailed: true,
    });
  });

  test('Reducer getUserInfo pending', () => {
    const action = {
      type: getUserInfo.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      getUserInfoRequest: true,
    });
  });
  test('Reducer getUserInfo fulfilled', () => {
    const action = {
      type: getUserInfo.fulfilled.type,
      payload: {
        user: user.user,
      },
    };
    expect(
      reducer(
        {
          ...initialState,
          getUserInfoRequest: true,
          getUserInfoFailed: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      user: user.user,
    });
  });
  test('Reducer getUserInfo rejected', () => {
    const action = {
      type: getUserInfo.rejected.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          getUserInfoRequest: true,
          user: user.user,
        },
        action
      )
    ).toEqual({
      ...initialState,
      getUserInfoFailed: true,
    });
  });

  test('Reducer updateUserInfo pending', () => {
    const action = {
      type: updateUserInfo.pending.type,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      updateUserInfoRequest: true,
    });
  });
  test('Reducer updateUserInfo fulfilled', () => {
    const action = {
      type: updateUserInfo.fulfilled.type,
      payload: {
        user: {
          email: 'test3@tt.com',
          name: 'updateUser name',
        },
      },
    };
    expect(
      reducer(
        {
          ...initialState,
          updateUserInfoRequest: true,
          updateUserInfoFailed: true,
          user: user.user,
        },
        action
      )
    ).toEqual({
      ...initialState,
      user: action.payload.user,
    });
  });
  test('Reducer updateUserInfo rejected', () => {
    const action = {
      type: updateUserInfo.rejected.type,
    };
    expect(
      reducer(
        {
          ...initialState,
          updateUserInfoRequest: true,
          user: user.user,
        },
        action
      )
    ).toEqual({
      ...initialState,
      user: user.user,
      updateUserInfoFailed: true,
    });
  });
});
