// 记账相关的分类与格式化工具

/** 开销分类（名称 + Vant 图标 + 颜色），用于记账页的图标与选择器 */
export const EXPENSE_CATEGORIES = [
  { name: '门票', icon: 'ticket-o', color: '#1989fa' },
  { name: '餐饮', icon: 'shop-o', color: '#ff976a' },
  { name: '交通', icon: 'logistics', color: '#07c160' },
  { name: '住宿', icon: 'hotel-o', color: '#7232dd' },
  { name: '购物', icon: 'gift-o', color: '#f7598f' },
  { name: '其他', icon: 'ellipsis', color: '#969799' }
]

/** 根据分类名取分类配置，找不到返回「其他」 */
export function getCategory(name) {
  return (
    EXPENSE_CATEGORIES.find((item) => item.name === name) ||
    EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]
  )
}

/** 金额格式化：保留两位小数并加 ¥ 前缀 */
export function formatMoney(amount) {
  const num = Number(amount) || 0
  return `¥${num.toFixed(2)}`
}

/** 把时间戳格式化为 2026-09-29 这样的日期 */
export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * 按景点汇总开销。
 * 返回 [{ place, total, count }]，按总金额从高到低排序。
 */
export function summarizeByPlace(records) {
  const map = new Map()
  records.forEach((item) => {
    const place = item.place || '未填写景点'
    const prev = map.get(place) || { place, total: 0, count: 0 }
    prev.total += Number(item.amount) || 0
    prev.count += 1
    map.set(place, prev)
  })
  return [...map.values()].sort((a, b) => b.total - a.total)
}
