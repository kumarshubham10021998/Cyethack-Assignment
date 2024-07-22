import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import App from './App';
import './index.css';

const store = createStore(rootReducer);
const container = document.getElementById('root');
const root = createRoot(container); // createRoot container

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
