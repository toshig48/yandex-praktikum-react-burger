import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
})
