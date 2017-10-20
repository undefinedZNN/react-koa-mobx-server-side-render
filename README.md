# react-koa-mobx-server-side-render
react+koa+mobx server-side render

演示地址: (http://rsrd.zhunn.top/)

----------

## 前言

一个比较适合入门的项目, 当然对react还是需要一定的了解

这个项目的初衷是, react 的脚手架在市面上纷繁凌乱也不知道选择那个好, 
所以决定自己从零开始,也是为了能够更加了解下react , 和服务端渲染.

我之前一直是做服务端的,web前端大概也就半年多之前左右,我们公司之前一直是使用vue,
所有有不足之处还希望大牛能给予指点.

也希望能通过这个项目能帮助,想入坑的小伙伴.

有什么疑问我也很乐意帮忙解答, 如果就得这个项目对你有帮助也希望不要吝啬你的 Star,动动小手点右上角 "Star"

----------

### 服务端渲染优点

1. 有利于seo, 让搜索引擎爬虫更容易的识别内容

2. 加快首屏的渲染速度.
在纯客户端渲染的情况下, 即使资源文件全部加载完成后react也需要一段的页面dom渲染时间.
服务端渲染可以将初始的dom渲染出来直接下发给客户端,优化首屏白屏的时间

3. 减轻服务端压力.
如在项目中会有些公用且频繁调用的后端接口,服务端渲染时我们只需调用一次缓存在渲染服务器,这样可以减轻api服务器的压力,提高访问速度

----------


### 目录结构

```bash
├── /config/         # 项目配置目录
├── /dist/           # 项目输出目录
├── /server/         # 项目服务端目录
│ ├── /middleware/   # 服务端中间件
│ ├── /render/       # 服务端资源渲染
│ ├── /template/     # 开发环境摸版
│ ├── server.dev.js  # 开发环境入口文件
│ └── server.prod.js # 生产环境入口文件
├── /src/            # 项目源码目录
│ ├── /assets/       # 静态资源目录
│ ├── /components/   # 公用组件目录
│ ├── /containers/   # 页面组件目录
│ ├── /routes/       # 路由组件目录
│ ├── /stores/       # 数据仓库目录
│ ├── /utils/        # 工具函数目录
│ ├── routes.jsx     # 路由文件入口
│ └── index.jsx      # 入口文件
├── /template/       # 项目摸版目录
├── /webpack/        # webpack 配置目录
├── package.json     # 项目信息
├── .babelrc         # Babel配置
└── .eslintrc        # Eslint配置
```

----------

### 技术栈
react + react-router 4.X + koa2 + webpack + mobx + bodymovin

----------

### 快速开始 (nodejs 8.0+)

安装依赖:

```bash
npm install OR yarn install
```

开发：

```bash
npm start OR npm run dev
```

打包:

```bash
npm run build
```

正式代码运行:

```bash
npm run prod
```

----------

### 路由配置
本项目采用的是 react-router 4.X具体详见官方文档

为了方便管理,项目定义了一个唯一的路由出口(服务端和客户端公用) `src/routes/index.jsx` , 将路由配置按功能分模块导入

为了方便项目的管理, 参考官方文档自定义了两个路由组件

1.RedirectWithStatus

作用: 带页面状态的跳转(为了兼容服务端渲染能在context获取面状态)
组件路径:  `src/components/RedirectWithStatus/RedirectWithStatus.jsx`

2.SetStaticContext

作用: 设置服务端渲染能在context获取面状态,seo信息等
组件路径: `SetStaticContext src/components/SetStaticContext/SetStaticContext.jsx`

路由模块实例代码

```js
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Counter,
  RouterDemo,
  NotFoundPage,
  Md5,
  Bodymovin
} from 'Containers'

import { RedirectWithStatus } from 'Components'

export default class AppRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/app/count" component={Counter}/>
        <Route path="/app/routerDemo" component={RouterDemo}/>
        <Route path="/app/md5" component={Md5}/>
        <Route path="/app/bodymovin" component={Bodymovin}/>
        {/** 路由组中想定义404页面请末尾加上18,19行代码 **/}
        <Route path='/404' component={NotFoundPage}/>
        <RedirectWithStatus status={404} from="*" to="/404" />
      </Switch>
    )
  }
}

```

----------

### 页面组件

为了服务端渲染达到更好的同构效果, 在页面组件中可以引入 SetStaticContext 组件, 这个组件可以让页面达到更好的服务端渲染效果.

如可以定义文档的title, keywords, description, 设置当前页面的http状态码.

当然也可以不使用 SetStaticContext 组件不使用组件的情况下默认服务端渲染接收到的状态码是200, title, keywords, description值为空字符

```js
import React from 'react'
import { SetStaticContext } from 'Components'

export default class Home extends React.Component {
  render() {
    const seoInfo = {
      title: '(react 服务端渲染示例) react server side render demo',
      keywords: 'react server side render demo 服务端渲染示例 mobx',
      description: 'react server side render demo 服务端渲染示例 mobx'
    }
    // const smile = require('Assets/img/smile.png')
    return (
      <SetStaticContext code={200} seoInfo={seoInfo}>
        <div className='container-home'>
          hello world!
        </div>
      </SetStaticContext>
    )
  }
}

```

### License

[MIT](https://github.com/undefinedZNN/react-koa-mobx-server-side-render/blob/master/LICENSE)