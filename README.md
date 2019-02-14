# react SSR 脚手架

### 写在开头
这是我在学习 react ssr 的过程中边学边练搭建的脚手架，可供大家了解 react ssr 的思路和参考搭建自己的脚手架。代码中有很些很基础（可能不是很必要）的注释方便自己记忆和学习。

### 主要特性
- 首屏服务端渲染，js 加载完成后客户端接管路由，此时和 spa 表现相同
- react-loadable 异步组件

### 技术栈
- ##### 客户端
webpack4 react16 redux thunk react-router4
- ##### 服务端
express ejs(模版引擎)

### 只用客户端渲染
- ##### 开发环境
```
yarn run dev:client
```
然后访问地址：http://127.0.0.1:9009/main
- ##### 生产环境
```
yarn run build:client
```
然后 /dist 目录中会生成编译后的代码，部署使用 nginx 代理出静态资源即可

### 使用 ssr
- ##### 开发环境
- - 编译服务端代码
```
yarn run build:server
```
- - 运行服务端代码
```
yarn run dev:server
```
然后访问地址：http://127.0.0.1:5000/main ，此时可看到服务端渲染出的首屏
- ##### 生产环境
```
// 编译
yarn run build:server
// 启动服务
yarn start
```

### 说明
- 只有客户端渲染的时候才会有区分开发环境和生产环境
- 服务端渲染时使用的代码不管时开发时还是生产中都是使用的打包后的代码
- 一般而言，直接在该脚手架基础上开发，服务端代码如果没有特殊需求可以不更改，可完全按照传统react开发模式进行开发，生产时启动服务端node服务即可
- 服务端渲染只有首屏，如：初次渲染或者F5刷新

### 目录结构
```
├── README.md
├── buildConfig webpack配置文件
│   ├── webpack.base.js 客户端服务端共用文件
│   ├── webpack.client.js 客户端配置（生产和开发环境通过 --env.mode=（development|production）区分）
│   └── webpack.server.js 服务端配置文件
├── package.json
├── src
│   ├── dist 打包后的文件
│   ├── client
│   │   ├── index.html 客户端html模版
│   │   └── index.js 客户端 react 挂载
│   ├── component
│   │   ├── App 主组件
│   │   ├── Hoc 高阶组件，使服务端渲染时可以获得当前组件的 css 样式
│   │   └── PagesLoading 页面 loading
│   ├── pages 路由页面
│   ├── redux redux 相关文件
│   ├── router react-router 主路由
│   ├── server
│   │   ├── index.js 服务端入口文件
│   │   ├── server.template.ejs 服务端模版文件
│   │   └── serverRender.js react 服务端渲染函数
│   └── style 全局scss 文件
├── nodemon.json
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .stylelintrc styleLint 配置文件
├── package.json
└── postcss.config.js

```

### 未来
- 计划加入编译es7语法async await 语法
- 加入 mock API 服务器，代替当前使用 setTimeOut 的方式 mock异步请求
``` javascript
function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = [
        {
          id: 1,
          content: 'a',
          value: 11,
        }
      ];
      resolve(result);
    }, 1000);
  });
}
```
