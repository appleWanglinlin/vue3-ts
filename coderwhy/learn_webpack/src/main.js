import { createApp } from 'vue'
import { sum } from './js/ES'
const { fn } = require('./js/CommonJS')

import App from './App.vue'
sum(12,12)
fn()
import './js/element'
import './css/test.less'

// 使单个模块更新，不是整个项目更新
// 写或不写都是这个效果
if(module.hot) {
  module.hot.accept("./js/element.js", () => {
    console.log('element模块发生了更新')
  })
}

const app = createApp(App)
app.mount('#app')