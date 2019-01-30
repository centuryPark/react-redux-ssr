const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import serverRender from './serverRender';
import routes from '../router';
import configureStore from '../redux/store';

const app = express();
app.use(cookieParser());

// proxy middleware options
const proxyOption = {
  target: 'HOST',
  changeOrigin: true
};
// create the proxy (without context)
const apiProxy = proxy(proxyOption);
app.use('/api', apiProxy);

app.use('/public', express.static('dist'));

app.get('/health', function (req, res) {
  res.sendStatus(200);
});

app.get('*', (req, res) =>{
  const store = configureStore();
  // 获取匹配的路由（包含嵌套）
  const matchedRoutes = matchRoutes(routes, req.path);
  const dataTask = [];
  // 加载当前页面所需要的数据,存入 store
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve) => {
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      dataTask.push(promise)
    }
  });
  // 等待所有数据加载完成后，返回页面
  Promise.all(dataTask).then(function() {
    const context = { css: [] };
    const { content, cssText } = serverRender(store, routes, req, context);
    const template = fs.readFileSync('./dist/server.ejs', 'utf8');
    const html = ejs.render(template, {
      appString: content,
      initialState: JSON.stringify(store.getState()),
      cssText: cssText
    });
    res.send(html);
  });
});

 app.use((err, req, res, next) => {
  res.status(500).send('Sorry,Something goes wrong!')
});

const server = app.listen(5000);
