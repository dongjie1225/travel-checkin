import React from 'react'
import Cell from './Cell'
import Empty from './Empty'
import Icon from './Icon'
import SwipeCell from './SwipeCell'
import { formatRelative, formatTime } from '../utils/location'

/**
 * 打卡记录列表
 * 对应 Vue 版 components/CheckinList.vue
 */
export default function CheckinList({ records, onDelete }) {
  return (
    <div className="list-wrap">
      <div className="list-head">
        <span className="list-head__title">打卡记录</span>
        <span className="list-head__count">{records.length} 条</span>
      </div>

      {!records.length ? (
        <Empty description="还没有打卡记录" />
      ) : (
        <div className="list-group">
          {records.map((item, index) => (
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
                  <div className={`pin${index === 0 ? ' pin--latest' : ''}`}>
                    <Icon name="location-o" />
                  </div>
                }
                title={item.name}
                label={
                  <div className="cell-label">
                    <span className="cell-label__time">
                      <Icon name="clock-o" />
                      {formatTime(item.timestamp)}
                    </span>
                    <span className="cell-label__relative">
                      {formatRelative(item.timestamp)}
                    </span>
                    {item.coords ? (
                      <span className="cell-label__coords">{item.coords}</span>
                    ) : null}
                  </div>
                }
                value={
                  index === 0 ? (
                    <span className="cell-tag cell-tag--primary">最新</span>
                  ) : null
                }
              />
            </SwipeCell>
          ))}
        </div>
      )}
    </div>
  )
}
