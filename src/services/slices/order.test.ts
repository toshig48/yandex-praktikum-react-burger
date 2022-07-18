import { AnyAction } from 'redux';
import { TOrder } from '../types';
import { orderError, orderLoading, orderReceived, orderReducer } from './order';

describe('Создание заказа', () => {
  it('Установка initialState', () => {
    const result = orderReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      loading: false,
      order: null,
      error: ''
    });
  })

  it('Начало загрузки', () => {
    const state = orderReducer(undefined, {} as AnyAction);
    const action = orderLoading();
    const result = orderReducer(state, action);
    expect(result).toEqual({
      loading: true,
      order: null,
      error: ''
    });
  })

  it('Успешное окончание загрузки', () => {
    const state = orderReducer(undefined, {} as AnyAction);
    const action = orderReceived({
      ingredients: [],
      _id: "string",
      owner: {
        email: "string",
        name: "string",
        createdAt: new Date(2022, 1, 1),
        updatedAt: new Date(2022, 1, 1)
      },
      status: "string",
      name: "string",
      createdAt: new Date(2022, 1, 1),
      updatedAt: new Date(2022, 1, 1),
      number: 0,
      price: 0,
    } as TOrder);
    const result = orderReducer(state, action);
    expect(result).toEqual({
      order: {
        ingredients: [],
        _id: "string",
        owner: {
          email: "string",
          name: "string",
          createdAt: new Date(2022, 1, 1),
          updatedAt: new Date(2022, 1, 1)
        },
        status: "string",
        name: "string",
        createdAt: new Date(2022, 1, 1),
        updatedAt: new Date(2022, 1, 1),
        number: 0,
        price: 0,
      },
      loading: false,
      error: ''
    });
  })

  it('Загрузка с ошибкой', () => {
    const state = orderReducer(undefined, {} as AnyAction);
    const action = orderError('string');
    const result = orderReducer(state, action);
    expect(result).toEqual({
      order: null,
      loading: false,
      error: 'string'
    });
  })
})