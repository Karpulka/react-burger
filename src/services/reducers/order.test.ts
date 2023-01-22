import reducer, { initialState, clearNewOrder } from './order';
import { order, createOrderMock, orderInfoMock } from '../../utils/data';
import { createOrder, getOrderInfo } from '../actions/order';

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

  test('Reducer createOrder fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: createOrderMock,
    };

    expect(
      reducer(
        {
          ...initialState,
          orderRequest: true,
          orderFailed: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      newOrder: createOrderMock,
    });
  });

  test('Reducer createOrder pending', () => {
    const action = {
      type: createOrder.pending.type,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  test('Reducer createOrder rejected', () => {
    const action = {
      type: createOrder.rejected.type,
    };

    expect(
      reducer(
        {
          ...initialState,
          orderRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      orderFailed: true,
    });
  });

  test('Reducer getOrderInfo fulfilled', () => {
    const action = {
      type: getOrderInfo.fulfilled.type,
      payload: orderInfoMock,
    };

    expect(
      reducer(
        {
          ...initialState,
          getOrderInfoRequest: true,
          getOrderInfoFailed: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      orderInfo: orderInfoMock,
    });
  });

  test('Reducer getOrderInfo pending', () => {
    const action = {
      type: getOrderInfo.pending.type,
    };

    expect(reducer({ ...initialState, orderInfo: orderInfoMock }, action)).toEqual({
      ...initialState,
      orderInfo: null,
      getOrderInfoRequest: true,
    });
  });

  test('Reducer getOrderInfo rejected', () => {
    const action = {
      type: getOrderInfo.rejected.type,
    };

    expect(
      reducer(
        {
          ...initialState,
          orderInfo: orderInfoMock,
          getOrderInfoRequest: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      orderInfo: null,
      getOrderInfoFailed: true,
    });
  });
});
