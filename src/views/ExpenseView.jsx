import React, { useMemo, useState } from 'react'
import Button from '../components/Button'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Icon from '../components/Icon'
import NavBar from '../components/NavBar'
import { showToast } from '../components/Toast'
import { formatMoney, summarizeByPlace } from '../utils/expense'
import { loadExpenses, saveExpenses } from '../utils/expenseStorage'

/**
 * 旅游记账页
 * 对应 Vue 版 views/ExpenseView.vue
 */
export default function ExpenseView() {
  const [records, setRecords] = useState(() => loadExpenses())
  const [showForm, setShowForm] = useState(false)

  // 总开销
  const totalAmount = useMemo(
    () => records.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [records]
  )

  // 按景点汇总
  const byPlace = useMemo(() => summarizeByPlace(records), [records])

  // 已填过的景点名，用于表单快捷填充
  const placeOptions = useMemo(() => byPlace.map((item) => item.place), [byPlace])

  // 花费最高的景点
  const topPlace = byPlace[0] || null

  const persist = (next) => {
    setRecords(next)
    saveExpenses(next)
  }

  const handleSubmit = (payload) => {
    const record = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      ...payload,
      timestamp: Date.now()
    }
    persist([record, ...records])
    showToast({ message: '已记一笔', position: 'bottom' })
  }

  const handleDelete = (id) => {
    persist(records.filter((item) => item.id !== id))
    showToast({ message: '已删除该条记录', position: 'bottom' })
  }

  return (
    <div className="page">
      <NavBar
        title="旅游记账"
        leftText="开销统计"
        onLeftClick={() =>
          showToast({ message: `共 ${records.length} 笔开销`, position: 'bottom' })
        }
      />

      <div className="page-body">
        {/* 总开销摘要 */}
        <div className="summary summary--pink">
          <p className="summary__label">总开销</p>
          <p className="summary__amount">{formatMoney(totalAmount)}</p>
          <div className="summary__meta">
            <span>{records.length} 笔</span>
            <span className="summary__dot">·</span>
            <span>{byPlace.length} 个景点</span>
          </div>
          {topPlace ? (
            <p className="summary__top">
              花费最多：{topPlace.place} {formatMoney(topPlace.total)}
            </p>
          ) : null}
        </div>

        {/* 按景点汇总 */}
        {byPlace.length ? (
          <div className="places">
            {byPlace.map((item) => (
              <div key={item.place} className="places__item">
                <span className="places__name">{item.place}</span>
                <span className="places__count">{item.count} 笔</span>
                <span className="places__total">{formatMoney(item.total)}</span>
              </div>
            ))}
          </div>
        ) : null}

        {/* 开销明细列表 */}
        <ExpenseList records={records} onDelete={handleDelete} />
      </div>

      {/* 记账按钮：固定在列表下方 */}
      <div className="action-bar">
        <Button
          type="primary"
          block
          round
          size="large"
          className="action-bar__btn"
          onClick={() => setShowForm(true)}
        >
          <Icon name="plus" className="action-bar__icon" />
          记一笔
        </Button>
        <p className="action-bar__hint">记录在不同景点的开销，左滑可删除</p>
      </div>

      {/* 新增开销弹窗 */}
      <ExpenseForm
        show={showForm}
        placeOptions={placeOptions}
        onSubmit={handleSubmit}
        onClose={() => setShowForm(false)}
      />
    </div>
  )
}
