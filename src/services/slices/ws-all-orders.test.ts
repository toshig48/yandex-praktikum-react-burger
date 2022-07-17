import { AnyAction } from 'redux';
import { TShowModal } from '../types';
import { getDateStringForOrdersList } from '../utils/func';
import { onAllOrdersMessage, wsAllOrdersConnectionClosed, wsAllOrdersConnectionError, wsAllOrdersConnectionSuccess, wsAllOrdersInit, wsAllOrdersReducer } from './ws-all-orders';

describe('Web-сокет: все заказы', () => {
  it('Установка initialState', () => {
    const result = wsAllOrdersReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Инициализация web-сокет', () => {
    const state = wsAllOrdersReducer(undefined, {} as AnyAction);
    const action = wsAllOrdersInit();
    const result = wsAllOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Подключено', () => {
    const state = wsAllOrdersReducer(undefined, {} as AnyAction);
    const action = wsAllOrdersConnectionSuccess();
    const result = wsAllOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: true,
      error: '',
      orders: null
    });
  })

  it('Подключение с ошибкой', () => {
    const state = wsAllOrdersReducer(undefined, {} as AnyAction);
    const action = wsAllOrdersConnectionError('string');
    const result = wsAllOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      orders: null,
      error: 'string'
    });
  })

  it('Отключено', () => {
    const state = wsAllOrdersReducer(undefined, {} as AnyAction);
    const action = wsAllOrdersConnectionClosed();
    const result = wsAllOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: null
    });
  })

  it('Получены данные', () => {
    const state = wsAllOrdersReducer(undefined, {} as AnyAction);
    const action = onAllOrdersMessage({
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
    const result = wsAllOrdersReducer(state, action);
    expect(result).toEqual({
      isConnected: false,
      error: '',
      orders: {
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
          dateBeautifulString: getDateStringForOrdersList(new Date(2022, 1, 1))
        },
        {
          _id: '2',
          status: 'string',
          name: 'string',
          createdAt: new Date(2022, 2, 1),
          updatedAt: new Date(2022, 2, 1),
          number: 0,
          ingredients: [],
          dateBeautifulString: getDateStringForOrdersList(new Date(2022, 2, 1))
        }]
      }
    });
  })
})