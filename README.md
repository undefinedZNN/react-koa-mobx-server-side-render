# react-koa-mobx-server-side-render
react+koa+mobx server-side render

最近一段时间在研究服务端渲染, 所以写了个demo分享出来,
文档后续我再补充

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

### 快速开始

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

### License

[MIT](https://github.com/undefinedZNN/react-koa-mobx-server-side-render/blob/master/LICENSE)