import { AnyAction } from 'redux';
import { TBurger } from '../types';

import { allIngredientsError, allIngredientsLoading, allIngredientsReceived, allIngredientsReducer } from './all-ingredients'

describe('Все ингридиенты', () => {
  it('Установка initialState', () => {
    const result = allIngredientsReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      items: [],
      loading: false,
      error: ''
    });
  })

  it('Начало загрузки', () => {
    const state = allIngredientsReducer(undefined, {} as AnyAction);
    const action = allIngredientsLoading();
    const result = allIngredientsReducer(state, action);
    expect(result).toEqual({
      items: [],
      loading: true,
      error: ''
    });
  })

  it('Успешное окончание загрузки', () => {
    const state = allIngredientsReducer(undefined, {} as AnyAction);
    const action = allIngredientsReceived([{
      _id: '1',
      name: 'string',
      type: 'string',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: 'string',
      image_mobile: 'string',
      image_large: 'string',
      key: 'string',
      index: 0
    } as TBurger]);
    const result = allIngredientsReducer(state, action);
    expect(result).toEqual({
      items: [{
        _id: '1',
        name: 'string',
        type: 'string',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: 'string',
        image_mobile: 'string',
        image_large: 'string',
        key: 'string',
        index: 0
      }],
      loading: false,
      error: ''
    });
  })

  it('Загрузка с ошибкой', () => {
    const state = allIngredientsReducer(undefined, {} as AnyAction);
    const action = allIngredientsError('string');
    const result = allIngredientsReducer(state, action);
    expect(result).toEqual({
      items: [],
      loading: false,
      error: 'string'
    });
  })
})