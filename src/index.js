import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import tickersReducer from './reducers/stocksReducer'
//import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux'
import {userSelector} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
 
const store = createStore(tickersReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export {store};


// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {}
// }

ReactDOM.render(  
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
