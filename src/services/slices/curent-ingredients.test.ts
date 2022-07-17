import { AnyAction } from 'redux';
import { TBurger } from '../types';

import { setCurentIngredient, curentIngredientReducer, setFlagClear, unSetCurentIngredient } from './curent-ingredients';

describe('Текущий ингридиенты', () => {
  it('Установка initialState', () => {
    const result = curentIngredientReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      flagClear: false,
      item: null
    });
  })

  it('Установка текущего ингридиента', () => {
    const state = curentIngredientReducer(undefined, {} as AnyAction);
    const action = setCurentIngredient({
      _id: '1',
      name: 'string'
    } as TBurger);
    const result = curentIngredientReducer(state, action);
    expect(result).toEqual({
      flagClear: false,
      item: {
        _id: '1',
        name: 'string'
      }
    });
  })

  it('Установка флага очистки', () => {
    const state = curentIngredientReducer(undefined, {} as AnyAction);
    const action = setFlagClear();
    const result = curentIngredientReducer(state, action);
    expect(result).toEqual({
      flagClear: true,
      item: null
    });
  })

  it('Очистка текущего ингридиента', () => {
    const state = curentIngredientReducer(undefined, {} as AnyAction);
    const action = unSetCurentIngredient();
    const result = curentIngredientReducer(state, action);
    expect(result).toEqual({
      flagClear: false,
      item: null
    });
  })
})