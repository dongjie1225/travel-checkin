// 旅游记账记录本地持久化

const STORAGE_KEY = 'travel-expense:records'

/** 读取全部开销记录 */
export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch (err) {
    console.warn('[expense] 读取本地记录失败：', err)
    return []
  }
}

/** 覆盖写入全部开销记录 */
export function saveExpenses(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch (err) {
    console.warn('[expense] 写入本地记录失败：', err)
  }
}
