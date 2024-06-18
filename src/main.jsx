import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { PhotoProvider } from 'react-photo-view';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './assets/style/main.css';
import { store } from './redux/store.js';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <PhotoProvider>
            <App />
          </PhotoProvider>
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
