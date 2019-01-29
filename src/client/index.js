import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Switch } from 'react-router';
// import { Provider } from 'react-redux';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { ConnectedRouter } from 'connected-react-router';
import App from '../component/app';
// import configureStore from './redux/store';
import '../style/index.scss';


// const initState = {};
// const history = createBrowserHistory();
// const store = configureStore(history, initState);

ReactDOM.render(
  <App />,
document.getElementById('root'),
);
