import React, { Component, Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import router from '../../router';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Fragment>{renderRoutes(router)}</Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
