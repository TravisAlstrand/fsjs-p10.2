import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from './context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);