import '../css/element.css'
import '../css/test.less'
import '../css/image.css'
import imgSrc from '../img/bg.jpg'
import '../font/iconfont.css'

const spanEl = document.createElement('span')
spanEl.innerText = 'I can'
spanEl.className = 'title'

// 背景图片
const divEl = document.createElement('div')
divEl.className = 'img-bg'

// img标签
const imgEl = document.createElement('img')
imgEl.src = imgSrc

// 字体图标
const iEl = document.createElement('i')
iEl.className = 'iconfont icon-ashbin'

setTimeout(() => {
  document.body.appendChild(spanEl)
  document.body.appendChild(divEl)
  document.body.appendChild(imgEl)
  document.body.appendChild(iEl)
})

setTimeout(() => {
  console.log(666)
}, 2000)