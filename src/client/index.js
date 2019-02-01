import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';
import router from '../router'
import configureStore from '../redux/store';
import '../style/index.scss';

const initState = window.__INITIAL__STATE__ || {};
const history = createBrowserHistory();
const store = configureStore(history, initState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(router)}
    </ConnectedRouter>
  </Provider>,
document.getElementById('root'),
);
