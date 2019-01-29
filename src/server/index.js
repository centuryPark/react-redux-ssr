const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import serverRender from './serverRender';
import routes from '../router';

const app = express();
app.use(cookieParser());
// app.use(express.static('public'));
app.use('/assets',express.static('dist'));

// proxy middleware options
const proxyOption = {
  target: 'HOST',
  changeOrigin: true
};
// create the proxy (without context)
const apiProxy = proxy(proxyOption);
app.use('/api', apiProxy);

app.get('*', (req, res) =>{
  const store = {};
  // 获取匹配的路由（包含嵌套）
  const matchedRoutes = matchRoutes(routes, req.path);
  const context = { css: [] };
  const content = serverRender(store, routes, req, context);
  const template = fs.readFileSync('./public/server.ejs', 'utf8');
  const html = ejs.render(template, {
        appString: content,
        initialState: '123',
    });
  res.send(html);
});

/*app.use((err, req, res, next) => {
  res.status(500).send('Sorry,Something goes wrong!')
});*/

const server = app.listen(5000);
