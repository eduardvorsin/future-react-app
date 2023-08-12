import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './index.css';
import { defaultTheme } from './components/UI/ThemeProvider/ThemeProvider';
import './localization/i18next';

document.documentElement.setAttribute('data-theme', defaultTheme);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
