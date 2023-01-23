import reducer, {
  initialState,
  connect,
  disconnect,
  wsConnecting,
  wsError,
  wsClose,
  wsOpen,
  wsMessage,
} from './personal-orders';
import { WebsocketStatus } from '../../utils/types';
import { feedOrderMock } from '../../utils/data';

describe('Personal orders reducer', () => {
  test('Reducer without additional parameters should return initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Reducer connect', () => {
    expect(reducer(initialState, connect('wsUrl'))).toEqual(initialState);
  });

  test('Reducer disconnect', () => {
    expect(reducer(initialState, disconnect())).toEqual(initialState);
  });

  test('Reducer wsConnecting', () => {
    expect(reducer(initialState, wsConnecting())).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  test('Reducer wsClose', () => {
    expect(reducer(initialState, wsClose())).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  test('Reducer wsOpen', () => {
    expect(
      reducer(
        {
          ...initialState,
          connectionError: 'some error message',
        },
        wsOpen()
      )
    ).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: '',
    });
  });

  test('Reducer wsMessage', () => {
    expect(
      reducer(
        {
          ...initialState,
          orders: feedOrderMock.orders.slice(1),
        },
        wsMessage(feedOrderMock)
      )
    ).toEqual({
      ...initialState,
      orders: feedOrderMock.orders,
      total: feedOrderMock.total,
      totalToday: feedOrderMock.totalToday,
    });
  });

  test('Reducer wsError', () => {
    const errorText = 'Some error message';
    expect(reducer(initialState, wsError(errorText))).toEqual({
      ...initialState,
      connectionError: errorText,
    });
  });
});
