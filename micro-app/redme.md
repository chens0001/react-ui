### EMP 方案是基于 webpack 5 module federation 的微前端方案。
 EMP文档地址 [文档](https://zeroing.jd.com/docs.html#/zh-cn/static-source)

### 零依赖
micro-app没有任何依赖，这赋予它小巧的体积和更高的扩展性，所有功能都封装到一个类WebComponent组件中，从而实现在基座应用中嵌入一行代码即可渲染一个微前端应

### 兼容所有框架
为了保证各个业务之间独立开发、独立部署的能力，micro-app做了诸多兼容，在任何技术框架中都可以正常运行

### 路由
路由类型约束
1、基座是hash路由，子应用也必须是hash路由
2、基座是history路由，子应用可以是hash或history路由

### 生命周期
keep-alive模式与普通模式最大的不同是生命周期，因为它不会被真正的卸载，也就不会触发 unmount 事件。
1. created beforemount  mounted error  afterhidden beforeshow

### 预加载
预加载是指在应用尚未渲染时提前加载资源并缓存，从而提升首屏渲染速度。
预加载并不是同步执行的，它会在浏览器空闲时间
microApp.preFetch(Array<app> | Function => Array<app>)

### 数据通信
micro-app会向子应用注入名称为microApp的全局对象，子应用通过这个对象和基座应用进行数据交互。
```js
// 直接获取数据
const data = window.microApp.getData() // 返回基座下发的data数据

// 方式2：绑定监听函数
function dataListener (data) {
  console.log('来自基座应用的数据', data)
}

window.microApp.addDataListener(dataListener: Function, autoTrigger?: boolean)

// 解绑监听函数
window.microApp.removeDataListener(dataListener: Function)

// 清空当前子应用的所有绑定函数(全局数据函数除外)
window.microApp.clearDataListener()


// 二、子应用向基座应用发送数据
// dispatch只接受对象作为参数
window.microApp.dispatch({type: '子应用发送的数据'})

```


### 性能&内存优化
micro-app支持两种渲染微前端的模式，默认模式和umd模式

默认模式：子应用在初次渲染和后续渲染时会顺序执行所有js，以保证多次渲染的一致性。
umd模式：子应用暴露出mount、unmount方法，此时只在初次渲染时执行所有js，后续渲染时只会执行这两个方法

  #### 建议
  如果子应用渲染和卸载不频繁，那么使用默认模式即可，如果子应用渲染和卸载非常频繁建议使用umd模式。

方案优势
1. webpack 联邦编译可以保证所有子应用依赖解耦；
2. 应用间去中心化的调用、共享模块；
3. 模块远程 ts 支持；

缺点：
1. 对 webpack 强依赖，老旧项目不友好；
2. 没有有效的 css 沙箱和 js 沙箱，需要靠用户自觉；
3. 子应用保活、多应用激活无法实现；
4. 主、子应用的路由可能发生冲突；
5. EMP 方案基于 webpack 5 联邦编译则约束了其使用范围

