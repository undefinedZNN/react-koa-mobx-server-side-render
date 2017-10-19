### bodymovin 服务端渲染支持

默认情况下 bodymovin 是不支持服务端渲染的

------

目前我使用的解决方案是修改原文件

#### path nede_modules/bodymovin/build/player/bodymovin.js


原文件1,2两行代码

```js
var window = (typeof window === "undefined") ? {} : window;
(function(root, factory) {

```

修改后文件代码

```js
var window = (typeof window === "undefined") ? {} : window;
var inBrowser=(typeof navigator !== "undefined");
(inBrowser) && (function(root, factory) {
```

解决方案来源: https://github.com/bodymovin/bodymovin/issues/440



