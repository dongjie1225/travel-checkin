import React, { useState } from 'react'
import CheckinAction from '../components/CheckinAction'
import CheckinList from '../components/CheckinList'
import NavBar from '../components/NavBar'
import { showToast } from '../components/Toast'
import { formatRelative, getCurrentLocation } from '../utils/location'
import { loadRecords, saveRecords } from '../utils/storage'

/**
 * 旅游记录页
 * 对应 Vue 版 views/CheckinView.vue
 */
export default function CheckinView() {
  const [records, setRecords] = useState(() => loadRecords())
  const [loading, setLoading] = useState(false)

  const total = records.length
  const lastRecord = records[0] || null

  // 打卡：定位后把新记录插到列表最前并持久化
  const handleCheckin = async () => {
    if (loading) return

    setLoading(true)
    try {
      const location = await getCurrentLocation()
      const record = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name: location.name,
        coords: location.coords || '',
        source: location.source,
        timestamp: Date.now()
      }

      const next = [record, ...records]
      setRecords(next)
      saveRecords(next)
      showToast({ message: '打卡成功', position: 'bottom' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => {
    const next = records.filter((item) => item.id !== id)
    setRecords(next)
    saveRecords(next)
    showToast({ message: '已删除该条记录', position: 'bottom' })
  }

  const handleLeftClick = () => {
    showToast({ message: `已打卡 ${total} 个地点`, position: 'bottom' })
  }

  return (
    <div className="page">
      <NavBar title="旅游记录" leftText="我的足迹" onLeftClick={handleLeftClick} />

      <div className="page-body">
        {/* 顶部摘要 */}
        <div className="summary">
          <div className="summary__count">
            <span className="summary__num">{total}</span>
            <span className="summary__unit">次打卡</span>
          </div>
          <div className="summary__latest">
            {lastRecord ? (
              <>
                <p className="summary__label">最近打卡</p>
                <p className="summary__place">{lastRecord.name}</p>
                <p className="summary__time">{formatRelative(lastRecord.timestamp)}</p>
              </>
            ) : (
              <p className="summary__empty">
                还没有打卡记录，点击下方按钮开始记录旅程吧
              </p>
            )}
          </div>
        </div>

        {/* 打卡记录列表 */}
        <CheckinList records={records} onDelete={handleDelete} />
      </div>

      {/* 打卡按钮：固定在列表下方 */}
      <CheckinAction loading={loading} onCheckin={handleCheckin} />
    </div>
  )
}
