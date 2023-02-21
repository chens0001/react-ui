### wujie（无界）

#### 无界方案
无界微前端方案基于 webcomponent 容器 + iframe 沙箱，能够完善的解决适配成本、样式隔离、运行性能、页面白屏、子应用通信、子应用保活、多应用激活、vite 框架支持、应用共享等用户的核心诉求。

体验demo [demo](https://wujie-micro.github.io/demo-main-vue/vite?vite=%2Fdemo-vite%2Fcontact)
文档 [文档](https://wujie-micro.github.io/doc/)

#### 成本低
主要体现在主应用的使用成本、子应用的适配成本两个方面。
无界提供基于 vue 封装的 wujie-vue 和基于 react 封装的 wujie-react，用户可以当初普通组件一样加载子应用

```js
  <WujieVue
  width="100%"
  height="100%"
  name="xxx"
  url="xxx"
  :sync="true"
  :fiber="true"
  :degrade="false"
  :fetch="fetch"
  :props="props"
  :plugins="plugins"
  :beforeLoad="beforeLoad"
  :beforeMount="beforeMount"
  :afterMount="afterMount"
  :beforeUnmount="beforeUnmount"
  :afterUnmount="afterUnmount"
></WujieVue>

```

#### 子应用适配成本
子应用首先需要做支持跨域请求改造,除此之外子应用可以不做任何改造就可以在无界框架中运行，不过此时运行的方式是重建模式。

子应用在无界中会根据是否保活、是否做了生命周期适配进入不同的运行模式
![avatar](https://pic2.zhimg.com/v2-97a9206ae0fcfbcf75126fc0068bc619_r.jpg)
其中保活模式、单例模式、重建模式适用于不同的业务场景，就算复杂点的单例模式用户也只是需要做一点简单的生命周期改造工作，可以说子应用适配成本极低。


#### 速度快， 无界微前端非常快，主要体现在首屏打开快、运行速度快两个方面
  ##### 首屏打开快
  无界微前端不仅能够做到静态资源的预加载，还可以做到子应用的预执行，无界提供 fiber 执行模式，采取类似 react fiber 的方式间断执行 js，每个 js 文件的执行都包裹在 requestidlecallback 中，每执行一个 js 可以返回响应外部的输入，但是这个颗粒度是 js 文件，如果子应用单个 js 文件过大，可以通过拆包的方式降低体积达到 fiber 执行模式效益最大化。
  
  ##### 运行速度快
  子应用的 js 在 iframe 内运行，由于 iframe 是一个天然的 js 运行沙箱，所以无需采用 with ( fakewindow ) 这种方式来指定子应用的执行上下文，从而避免由于采用 with 语句执行子应用代码而导致的性能下降，整体的运行性能和原生性能差别不大。
  
  ##### 原生隔离
  无界微前端实现了 css 沙箱和 js 沙箱的原生隔离，子应用不用担心污染问题

  ##### css 沙箱隔离
  无界将子应用的 dom 放置在 webcomponent + shadowdom 的容器中，除了可继承的 css 属性外实现了应用之间 css 的原生隔离。

  ##### js 沙箱隔离
  无界将子应用的 js 放置在 iframe（js-iframe）中运行，实现了应用之间 window、document、location、history 的完全解耦和隔离。

#### 子应用保活
  切换子应用后仍然可以保持子应用的状态和路由不会丢失

#### 子应用嵌套
无界支持子应用多层嵌套，嵌套的应用和正常应用一致，支持预加载、保活、同步、通信等能力，需要注意的是内嵌的子应用 name 也需要保持唯一性，否则将复用之前渲染出来的应用

#### 去中心化通信
无界提供多种通信方式：window.parent 直接通信、props 数据注入、去中心化 EventBus 通信机制：

#### 生命周期
beforeLoad：子应用开始加载静态资源前触发
beforeMount：子应用渲染前触发 （生命周期改造专用）
afterMount：子应用渲染后触发（生命周期改造专用）
beforeUnmount：子应用卸载前触发（生命周期改造专用）
afterUnmount：子应用卸载后触发（生命周期改造专用）
activated：子应用进入后触发（保活模式专用）
deactivated：子应用离开后触发（保活模式专用）

#### 插件系统
无界插件主要能力如下：

html-loader 可以对子应用 template 进行处理
js-excludes 和 css-excludes 可以排除子应用特定的 js 和 css 加载
js-before-loaders、js-loader、js-after-loaders 可以方便的对子应用 js 进行自定义
css-before-loaders、css-loader、css-after-loaders 可以方便的对子应用 css 进行自定义

#### vite 框架支持

#### 应用共享