import { AnyAction } from 'redux';
import { forgotPasswordReceived, passwordClearError, passwordError, passwordLoading, passwordReducer, resetPasswordReceived } from './password';

describe('Создание заказа', () => {
  it('Установка initialState', () => {
    const result = passwordReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      loading: false,
      allowResetPassword: false,
      error: ''
    });
  })

  it('Начало загрузки', () => {
    const state = passwordReducer(undefined, {} as AnyAction);
    const action = passwordLoading();
    const result = passwordReducer(state, action);
    expect(result).toEqual({
      loading: true,
      allowResetPassword: false,
      error: ''
    });
  })

  it('Успешное окончание загрузки напоминание пароля', () => {
    const state = passwordReducer(undefined, {} as AnyAction);
    const action = forgotPasswordReceived();
    const result = passwordReducer(state, action);
    expect(result).toEqual({
      loading: false,
      allowResetPassword: true,
      error: ''
    });
  })

  it('Успешное окончание загрузки восстановления пароля', () => {
    const state = passwordReducer(undefined, {} as AnyAction);
    const action = resetPasswordReceived();
    const result = passwordReducer(state, action);
    expect(result).toEqual({
      loading: false,
      allowResetPassword: false,
      error: ''
    });
  })

  it('Загрузка с ошибкой', () => {
    const state = passwordReducer(undefined, {} as AnyAction);
    const action = passwordError('string');
    const result = passwordReducer(state, action);
    expect(result).toEqual({
      loading: false,
      allowResetPassword: false,
      error: 'string'
    });
  })

  it('Очистка ошибки', () => {
    const state = passwordReducer(undefined, {} as AnyAction);
    const action = passwordClearError();
    const result = passwordReducer(state, action);
    expect(result).toEqual({
      loading: false,
      allowResetPassword: false,
      error: ''
    });
  })
})