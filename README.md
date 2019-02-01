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
