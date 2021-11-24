import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/index.scss';
import store, {persistor} from './store'
import {theme} from './constants/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </PersistGate>
  </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
