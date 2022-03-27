import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import {store, persistor } from './redux/store';

import './index.css';
import App from './App';
/*****************************************************************************************************/
/*************************Axios Interceptors(Api Injectors)*******************************************/
/*****************************************************************************************************/

// injecting Axios Interceptors in service request.
axios.interceptors.request.use((req) =>{
  
  // injecting Access_Token in services
  req.headers.Authorization = 'Bearer '+localStorage.getItem('token');
  return req;
});

// injecting Axios Interceptors in service response.
axios.interceptors.response.use((res) => {
  return res;
});

/*****************************************************************************************************/
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);