// 打卡记录本地持久化 —— 封装 localStorage 读写，避免组件里散落存储细节

const STORAGE_KEY = 'travel-checkin:records'

/** 读取全部打卡记录（按时间倒序） */
export function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch (err) {
    console.warn('[checkin] 读取本地记录失败：', err)
    return []
  }
}

/** 覆盖写入全部打卡记录 */
export function saveRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch (err) {
    console.warn('[checkin] 写入本地记录失败：', err)
  }
}
