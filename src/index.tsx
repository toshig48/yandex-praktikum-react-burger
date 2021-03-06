import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store';

import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
