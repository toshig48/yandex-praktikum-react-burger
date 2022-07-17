import { AnyAction } from 'redux';
import { userClear, userError, userInfoLoading, userInfoReceived, userLoginByToken, userLoginLoading, userLoginReceived, userLogoutLoading, userLogoutReceived, userReducer } from './user';

describe('Работа с пользователем', () => {
  it('Установка initialState', () => {
    const result = userReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      loading: false,
      loggedIn: false,
      user: null,
      error: ''
    });
  })

  it('Начало загрузки /auth/login', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userLoginLoading();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: true,
      loggedIn: false,
      user: null,
      error: ''
    });
  })

  it('Успешное окончание загрузки /auth/login', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userLoginReceived({
      email: 'string',
      name: 'string'
    });
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: true,
      user: {
        email: 'string',
        name: 'string'
      },
      error: ''
    });
  })

  it('Логин с помощью токена', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userLoginByToken();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: true,
      user: null,
      error: ''
    });
  })

  it('Начало загрузки /auth/logout', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userLogoutLoading();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: true,
      loggedIn: false,
      user: null,
      error: ''
    });
  })

  it('Успешное окончание загрузки /auth/logout', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userLogoutReceived();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: false,
      user: null,
      error: ''
    });
  })


  it('Начало загрузки /auth/user', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userInfoLoading();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: true,
      loggedIn: false,
      user: null,
      error: ''
    });
  })

  it('Успешное окончание загрузки /auth/user', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userInfoReceived({
      email: 'string',
      name: 'string'
    });
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: false,
      user: {
        email: 'string',
        name: 'string'
      },
      error: ''
    });
  })

  it('Загрузка с ошибкой', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userError('string');
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: false,
      user: null,
      error: 'string'
    });
  })

  it('Очистка текущего пользователя', () => {
    const state = userReducer(undefined, {} as AnyAction);
    const action = userClear();
    const result = userReducer(state, action);
    expect(result).toEqual({
      loading: false,
      loggedIn: false,
      user: null,
      error: ''
    });
  })
})