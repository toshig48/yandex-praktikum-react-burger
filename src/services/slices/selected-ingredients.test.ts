
import { AnyAction } from 'redux';
import { TBurger } from '../types';

import { addIngredient, clearIngredients, moveIngredient, removeIngredient, selectedIngredientsReducer } from './selected-ingredients'

describe('Выбранные ингридиенты', () => {
  it('Установка initialState', () => {
    const result = selectedIngredientsReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      items: []
    });
  })

  it('Добавление ингридиента', () => {
    const state = selectedIngredientsReducer(undefined, {} as AnyAction);
    const action = addIngredient({
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
    } as TBurger)
    const result = selectedIngredientsReducer(state, action);
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
      }]
    });
  })

  it('Удаление ингридиента', () => {
    const state = {
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
      }]
    };
    const action = removeIngredient(0);
    const result = selectedIngredientsReducer(state, action);
    expect(result).toEqual({
      items: []
    });
  })

  it('Сортировка ингридиентов', () => {
    const state = {
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
      },
      {
        _id: '2',
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
      },
      {
        _id: '3',
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
      }]
    };
    const action = moveIngredient({
      dragIndex: 1,
      hoverIndex: 2
    });
    const result = selectedIngredientsReducer(state, action);
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
      },
      {
        _id: '3',
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
      },
      {
        _id: '2',
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
      }]
    });
  })

  it('Очистка всех ингридиентов', () => {
    const state = selectedIngredientsReducer(undefined, {} as AnyAction);
    const action = clearIngredients();
    const result = selectedIngredientsReducer(state, action);
    expect(result).toEqual({
      items: []
    });
  })
})