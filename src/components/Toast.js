/**
 * 轻提示（React 版）
 *
 * Vant 的 Toast 是命令式 API，在 React 里用一个极简实现替代：
 * 动态挂载一个浮层节点，2 秒后自动移除，调用方式命令式、无需在组件里渲染。
 */
const CONTAINER_ID = 'react-toast-container'

function getContainer() {
  let el = document.getElementById(CONTAINER_ID)
  if (!el) {
    el = document.createElement('div')
    el.id = CONTAINER_ID
    document.body.appendChild(el)
  }
  return el
}

export function showToast({ message, position = 'middle', duration = 2000 }) {
  const container = getContainer()

  const toast = document.createElement('div')
  toast.className = `van-toast van-toast--${position} van-toast--text`
  toast.innerHTML = `<div class="van-toast__text"></div>`
  toast.querySelector('.van-toast__text').textContent = message
  container.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, duration)
}

export default showToast
