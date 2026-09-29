import React from 'react'
import Cell from './Cell'
import Empty from './Empty'
import Icon from './Icon'
import SwipeCell from './SwipeCell'
import { formatDate, formatMoney, getCategory } from '../utils/expense'

/**
 * 开销明细列表
 * 对应 Vue 版 components/ExpenseList.vue
 */
export default function ExpenseList({ records, onDelete }) {
  return (
    <div className="list-wrap">
      <div className="list-head">
        <span className="list-head__title">开销明细</span>
        <span className="list-head__count">{records.length} 条</span>
      </div>

      {!records.length ? (
        <Empty description="还没有开销记录" />
      ) : (
        <div className="list-group">
          {records.map((item, index) => {
            const category = getCategory(item.category)
            return (
              <SwipeCell
                key={item.id}
                renderRight={() => (
                  <button
                    type="button"
                    className="van-button van-button--danger swipe-delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <div className="van-button__content">删除</div>
                  </button>
                )}
              >
                <Cell
                  border={index !== records.length - 1}
                  icon={
                    <div
                      className="cat-icon"
                      style={{ color: category.color, background: `${category.color}1a` }}
                    >
                      <Icon name={category.icon} />
                    </div>
                  }
                  title={item.place}
                  label={
                    <div className="cell-label">
                      <span
                        className="cell-label__tag"
                        style={{
                          color: category.color,
                          border: `1px solid ${category.color}66`
                        }}
                      >
                        {item.category}
                      </span>
                      {item.note ? (
                        <span className="cell-label__note">{item.note}</span>
                      ) : null}
                      <span className="cell-label__date">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                  }
                  value={<span className="cell-amount">{formatMoney(item.amount)}</span>}
                />
              </SwipeCell>
            )
          })}
        </div>
      )}
    </div>
  )
}
