import { createApp } from 'vue'
import { sum } from './js/ES'
const { fn } = require('./js/CommonJS')

import App from './App.vue'
sum(12,12)
fn()
import './js/element'
import './css/test.less'

const app = createApp(App)
app.mount('#app')