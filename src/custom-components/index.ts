import type { App } from "vue";
import { defineAsyncComponent } from 'vue'

/**
 * ①使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
  ②然后 context 函数会返回一个导入函数 importFn，它又一个属性 keys() 获取所有的文件路径
  ③通过遍历文件路径数组，使用 importFn 根据路径导入组件对象
  const importFn = require.context('./', false, /\.vue$/) 参数：1. 目录 2. 是否加载子目录 3. 加载的正则匹配
 */
// const importFn = require.context('./custom-components',false, /\.vue$/)
// export function setupCustomeComponent(app: App<Element>): void {
//   importFn.keys().forEach(filePath => {
//     console.log('-----',filePath)
//     // 自动化导入组件
//     const component = importFn(filePath).default
//     // 把每一个导入的组件配置为全局组件
//     app.component(component.name, component)
//   });
// }

const components = import.meta.glob('./*.vue') // {./VButton.vue: ƒ}
export function setupCustomeComponent(app: App<Element>): void {
  for(const [key, value] of Object.entries(components)){
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    app.component(name, defineAsyncComponent(value))
  }
}