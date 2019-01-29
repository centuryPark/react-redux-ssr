import React, {Component, Fragment} from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

export default (store, routes, req, context) => {
    return renderToString(
        <StaticRouter location={req.path} context={context}>
            <Fragment>{renderRoutes(routes)}</Fragment>
        </StaticRouter>
    );
}