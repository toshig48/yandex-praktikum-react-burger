import { AnyAction } from 'redux';
import { TShowModal } from '../types';
import { closeModal, modalReducer, showModal } from './modal';

describe('Модальное окно', () => {
  it('Установка initialState', () => {
    const result = modalReducer(undefined, {} as AnyAction);
    expect(result).toEqual({
      isShowModal: false,
      isNavigateGoBack: false,
      titleModal: '',
      contentModal: null
    });
  })

  it('Модальное окно открыто', () => {
    const state = modalReducer(undefined, {} as AnyAction);
    const action = showModal({
      title: 'string',
      content: 'ReactChild',
      isNavigateGoBack: false,
    } as TShowModal);
    const result = modalReducer(state, action);
    expect(result).toEqual({
      isShowModal: true,
      isNavigateGoBack: false,
      titleModal: 'string',
      contentModal: 'ReactChild'
    });
  })

  it('Модальное окно закрыто', () => {
    const state = modalReducer(undefined, {} as AnyAction);
    const action = closeModal();
    const result = modalReducer(state, action);
    expect(result).toEqual({
      isShowModal: false,
      isNavigateGoBack: false,
      titleModal: '',
      contentModal: null
    });
  })
})