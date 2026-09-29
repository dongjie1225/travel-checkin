import React from 'react'
import Button from './Button'
import Icon from './Icon'

/**
 * 底部打卡按钮
 * 对应 Vue 版 components/CheckinAction.vue
 */
export default function CheckinAction({ loading, onCheckin }) {
  return (
    <div className="action-bar">
      <Button
        type="primary"
        block
        round
        size="large"
        className="action-bar__btn"
        loading={loading}
        loadingText="定位中..."
        onClick={onCheckin}
      >
        <Icon name="location-o" className="action-bar__icon" />
        打卡
      </Button>
      <p className="action-bar__hint">点击打卡，自动记录当前的位置和时间</p>
    </div>
  )
}
