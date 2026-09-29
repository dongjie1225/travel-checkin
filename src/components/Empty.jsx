import React from 'react'

/**
 * 空状态，对应 van-empty
 */
export default function Empty({ description = '暂无数据' }) {
  return (
    <div className="van-empty">
      <div className="van-empty__image">
        <svg viewBox="0 0 160 160" width="100%" height="100%">
          <defs>
            <linearGradient id="empty-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7f8fa" />
              <stop offset="100%" stopColor="#e8ebef" />
            </linearGradient>
          </defs>
          <rect x="20" y="40" width="120" height="80" rx="10" fill="url(#empty-g)" />
          <rect x="35" y="58" width="60" height="8" rx="4" fill="#dcdee0" />
          <rect x="35" y="76" width="90" height="8" rx="4" fill="#e5e8eb" />
          <rect x="35" y="94" width="45" height="8" rx="4" fill="#e5e8eb" />
          <circle cx="118" cy="96" r="20" fill="none" stroke="#dcdee0" strokeWidth="5" />
          <line x1="132" y1="110" x2="146" y2="124" stroke="#dcdee0" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
      <p className="van-empty__description">{description}</p>
    </div>
  )
}
