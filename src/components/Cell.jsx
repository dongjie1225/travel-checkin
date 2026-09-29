import React from 'react'

/**
 * 列表单元格，对应 van-cell（含 icon / title / label / value 四个插槽）
 */
export default function Cell({ icon, title, label, value, border = true, onClick }) {
  return (
    <div
      className={`van-cell${border ? ' van-cell--border' : ''}${
        onClick ? ' van-cell--clickable' : ''
      }`}
      onClick={onClick}
    >
      {icon ? <div className="van-cell__icon-slot">{icon}</div> : null}

      <div className="van-cell__title">
        <span>{title}</span>
        {label ? <div className="van-cell__label">{label}</div> : null}
      </div>

      {value ? <div className="van-cell__value">{value}</div> : null}
    </div>
  )
}
