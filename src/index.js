/* eslint-disable import/default */

import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';
import ChatStart from './components/chatStart';
import ChessContainer from './components/containers/ChessContainer'
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const createStoreWithMiddleware = applyMiddleware()(createStore);
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route>
				<Route path="/" component={ChatStart}/>
				<Route path="game/:link" component={ChessContainer}/>
			</Route>
		</Router>
  </Provider>,

 document.getElementById('main')
);



