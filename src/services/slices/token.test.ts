import { AnyAction } from 'redux';
import { tokenError, tokenLoading, tokenReceived, tokenReducer } from './token';

describe('Работа с Токеном', () => {
  it('Установка initialState', () => {
    const result = tokenReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      loading: false,
      error: ''
    });
  })

  it('Начало загрузки', () => {
    const state = tokenReducer(undefined, {} as AnyAction);
    const action = tokenLoading();
    const result = tokenReducer(state, action);
    expect(result).toEqual({
      loading: true,
      error: ''
    });
  })

  it('Успешное окончание загрузки', () => {
    const state = tokenReducer(undefined, {} as AnyAction);
    const action = tokenReceived();
    const result = tokenReducer(state, action);
    expect(result).toEqual({
      loading: false,
      error: ''
    });
  })

  it('Загрузка с ошибкой', () => {
    const state = tokenReducer(undefined, {} as AnyAction);
    const action = tokenError('string');
    const result = tokenReducer(state, action);
    expect(result).toEqual({
      loading: false,
      error: 'string'
    });
  })
})