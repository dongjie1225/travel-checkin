// 地点与时间相关的工具函数

/** 把时间戳格式化为 2026-09-29 10:19 这样的可读字符串 */
export function formatTime(timestamp) {
  const d = new Date(timestamp)
  const pad = (n) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  )
}

/** 生成相对时间描述，例如「刚刚」「3 分钟前」 */
export function formatRelative(timestamp) {
  const diff = Date.now() - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < 30 * day) return `${Math.floor(diff / day)} 天前`
  return formatTime(timestamp)
}

// 浏览器定位不可用 / 被拒绝时的兜底地点库
const FALLBACK_PLACES = [
  '北京市 · 东城区 · 南锣鼓巷',
  '上海市 · 黄浦区 · 外滩观景台',
  '杭州市 · 西湖区 · 断桥残雪',
  '成都市 · 武侯区 · 锦里古街',
  '厦门市 · 思明区 · 鼓浪屿码头',
  '西安市 · 碑林区 · 城墙南门',
  '广州市 · 越秀区 · 北京路步行街',
  '青岛市 · 市南区 · 栈桥海边'
]

/** 随机取一个兜底地点 */
export function randomFallbackPlace() {
  const index = Math.floor(Math.random() * FALLBACK_PLACES.length)
  return FALLBACK_PLACES[index]
}

/**
 * 获取当前位置名称。
 * 真实项目里应接入地图逆地理编码服务；这里优先用浏览器定位拿到经纬度，
 * 再配一个演示用地点名；定位失败则回退到内置地点库。
 */
export function getCurrentLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ name: randomFallbackPlace(), source: 'fallback' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        // 演示：用经纬度拼一个可读地点，实际可替换为逆地址解析
        resolve({
          name: `${randomFallbackPlace()}`,
          coords: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          source: 'gps'
        })
      },
      () => resolve({ name: randomFallbackPlace(), source: 'fallback' }),
      { timeout: 6000, maximumAge: 60 * 1000 }
    )
  })
}
