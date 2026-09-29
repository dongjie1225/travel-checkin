import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import 'vant/lib/index.css'
import './styles/global.css'
import './styles/vant-overrides.css'
import './styles/pages.css'

import App from './App'
import CheckinView from './views/CheckinView'
import ExpenseView from './views/ExpenseView'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/checkin" replace />} />
          <Route path="checkin" element={<CheckinView />} />
          <Route path="expense" element={<ExpenseView />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
