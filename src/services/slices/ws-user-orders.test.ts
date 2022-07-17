import { AnyAction } from 'redux';
import { getDateStringForOrdersList } from '../utils/func';
import { onUserOrdersMessage, wsUserOrdersConnectionClosed, wsUserOrdersConnectionError, wsUserOrdersConnectionSuccess, wsUserOrdersInit, wsUserOrdersReducer } from './ws-user-orders';

describe('Web-сокет: заказы текущего пользователя', () => {
  it('Установка initialState', () => {
    const result = wsUserOrdersReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Инициализация web-сокет', () => {
    const state = wsUserOrdersReducer(undefined, {} as AnyAction);
    const action = wsUserOrdersInit();
    const result = wsUserOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Подключено', () => {
    const state = wsUserOrdersReducer(undefined, {} as AnyAction);
    const action = wsUserOrdersConnectionSuccess();
    const result = wsUserOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: true,
      error: '',
      orders: null
    });
  })

  it('Подключение с ошибкой', () => {
    const state = wsUserOrdersReducer(undefined, {} as AnyAction);
    const action = wsUserOrdersConnectionError('string');
    const result = wsUserOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      orders: null,
      error: 'string'
    });
  })

  it('Отключено', () => {
    const state = wsUserOrdersReducer(undefined, {} as AnyAction);
    const action = wsUserOrdersConnectionClosed();
    const result = wsUserOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Получены данные', () => {
    const state = wsUserOrdersReducer(undefined, {} as AnyAction);
    const action = onUserOrdersMessage({
      success: true,
      total: 0,
      totalToday: 0,
      orders: [{
        _id: '1',
        status: 'string',
        name: 'string',
        createdAt: new Date(2022, 1, 1),
        updatedAt: new Date(2022, 1, 1),
        number: 0,
        ingredients: [],
        dateBeautifulString: 'string'
      },
      {
        _id: '2',
        status: 'string',
        name: 'string',
        createdAt: new Date(2022, 2, 1),
        updatedAt: new Date(2022, 2, 1),
        number: 0,
        ingredients: [],
        dateBeautifulString: 'string'
      }]
    });
    const result = wsUserOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: {
        success: true,
        total: 0,
        totalToday: 0,
        orders: [
          {
            _id: '2',
            status: 'string',
            name: 'string',
            createdAt: new Date(2022, 2, 1),
            updatedAt: new Date(2022, 2, 1),
            number: 0,
            ingredients: [],
            dateBeautifulString: getDateStringForOrdersList(new Date(2022, 2, 1))
          },
          {
            _id: '1',
            status: 'string',
            name: 'string',
            createdAt: new Date(2022, 1, 1),
            updatedAt: new Date(2022, 1, 1),
            number: 0,
            ingredients: [],
            dateBeautifulString: getDateStringForOrdersList(new Date(2022, 1, 1))
          }
        ]
      }
    });
  })
})