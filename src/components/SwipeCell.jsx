import React, { useRef, useState } from 'react'

/**
 * 侧滑单元格（React 版），对应 van-swipe-cell
 *
 * 通过 touch / mouse 拖拽把内容层向左平移，露出右侧的操作按钮。
 * 水平滑动超过一半阈值则吸附到打开态，否则回弹。
 */
export default function SwipeCell({ children, renderRight, rightWidth = 72 }) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)
  const draggingRef = useRef(false)

  const handleStart = (clientX) => {
    startXRef.current = clientX
    startOffsetRef.current = offset
    draggingRef.current = true
    setDragging(true)
  }

  const handleMove = (clientX) => {
    if (!draggingRef.current) return
    const delta = clientX - startXRef.current

    // 限制在 [-rightWidth, 0] 区间
    let next = startOffsetRef.current + delta
    if (next > 0) next = 0
    if (next < -rightWidth) next = -rightWidth
    setOffset(next)
  }

  const handleEnd = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)
    setOffset((current) => (current < -rightWidth / 2 ? -rightWidth : 0))
  }

  return (
    <div className="swipe-cell">
      {/* 右侧操作区（在内容层下方） */}
      <div className="swipe-cell__right" style={{ width: rightWidth }}>
        <div className="swipe-cell__right-inner" style={{ width: rightWidth }}>
          {renderRight ? renderRight() : null}
        </div>
      </div>

      <div
        className="swipe-cell__content"
        style={{
          transform: `translateX(${offset}px)`,
          transition: dragging
            ? 'none'
            : 'transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1)'
        }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {children}
      </div>
    </div>
  )
}
