import React from 'react'
import Icon from './Icon'

/**
 * 顶部导航栏，对应 van-nav-bar
 */
export default function NavBar({ title, leftText, onLeftClick }) {
  return (
    <div className="van-nav-bar van-nav-bar--fixed">
      <div className="van-nav-bar__content">
        <div className="van-nav-bar__left" onClick={onLeftClick}>
          <Icon name="arrow-left" className="van-nav-bar__arrow" />
          {leftText ? <span className="van-nav-bar__text">{leftText}</span> : null}
        </div>
        <div className="van-nav-bar__title van-ellipsis">{title}</div>
        <div className="van-nav-bar__right" />
      </div>
    </div>
  )
}
