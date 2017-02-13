/* eslint-disable import/default */

import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import ChatStart from './components/chatStart';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'

const createStoreWithMiddleware = applyMiddleware()(createStore);
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ChatStart />
  </Provider>,
 document.getElementById('main')
);



