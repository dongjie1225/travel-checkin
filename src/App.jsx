import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './components/Icon'

const TABS = [
  { to: '/checkin', name: '旅游记录', icon: 'location-o' },
  { to: '/expense', name: '旅游记账', icon: 'balance-pay' }
]

/**
 * 应用外壳：内容区 + 底部导航栏
 * 对应 Vue 版 App.vue 中的 van-tabbar 结构
 */
export default function App() {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      {/* 页面内容区 */}
      <Outlet />

      {/* 底部导航 */}
      <div className="van-tabbar van-tabbar--fixed van-tabbar--safe">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.to)
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="van-tabbar-item"
              style={active ? { color: '#1989fa' } : undefined}
            >
              <Icon name={tab.icon} className="van-tabbar-item__icon" />
              <span className="van-tabbar-item__text">{tab.name}</span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
