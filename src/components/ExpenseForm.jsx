import React, { useEffect, useState } from 'react'
import Button from './Button'
import Icon from './Icon'
import { showToast } from './Toast'
import { EXPENSE_CATEGORIES } from '../utils/expense'

/**
 * 新增开销的底部弹窗表单
 * 对应 Vue 版 components/ExpenseForm.vue（van-popup + van-field）
 */
export default function ExpenseForm({ show, placeOptions, onSubmit, onClose }) {
  const [place, setPlace] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('门票')
  const [note, setNote] = useState('')

  // 打开面板时清空表单（对应 Vue 里 watch(show) 的行为）
  useEffect(() => {
    if (show) {
      setPlace('')
      setAmount('')
      setCategory('门票')
      setNote('')
    }
  }, [show])

  const handleSubmit = () => {
    const placeName = place.trim()
    const money = Number(amount)

    if (!placeName) {
      showToast({ message: '请填写景点名称', position: 'bottom' })
      return
    }
    if (!amount || Number.isNaN(money) || money <= 0) {
      showToast({ message: '请填写正确的金额', position: 'bottom' })
      return
    }

    onSubmit({
      place: placeName,
      amount: Number(money.toFixed(2)),
      category,
      note: note.trim()
    })
    onClose()
  }

  if (!show) return null

  return (
    <div className="van-popup__overlay" onClick={onClose}>
      <div className="van-popup van-popup--bottom van-popup--round" onClick={(e) => e.stopPropagation()}>
        <div className="form">
          <p className="form__title">记一笔开销</p>

          <div className="van-cell-group van-cell-group--inset">
            {/* 景点 */}
            <div className="van-field">
              <label className="van-field__label">景点</label>
              <div className="van-field__value">
                <input
                  className="van-field__control"
                  value={place}
                  maxLength={20}
                  placeholder="请输入景点名称，如 外滩"
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
            </div>

            {/* 金额 */}
            <div className="van-field">
              <label className="van-field__label">金额</label>
              <div className="van-field__value">
                <div className="van-field__body">
                  <span className="form__yuan">¥</span>
                  <input
                    className="van-field__control"
                    type="number"
                    value={amount}
                    placeholder="请输入金额"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 备注 */}
            <div className="van-field">
              <label className="van-field__label">备注</label>
              <div className="van-field__value">
                <input
                  className="van-field__control"
                  value={note}
                  maxLength={30}
                  placeholder="选填，如 两人门票"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 分类选择 */}
          <p className="form__label">分类</p>
          <div className="cats">
            {EXPENSE_CATEGORIES.map((item) => {
              const active = category === item.name
              return (
                <div
                  key={item.name}
                  className={`cats__item${active ? ' cats__item--active' : ''}`}
                  style={
                    active
                      ? {
                          borderColor: item.color,
                          color: item.color,
                          background: `${item.color}14`
                        }
                      : undefined
                  }
                  onClick={() => setCategory(item.name)}
                >
                  <Icon name={item.icon} />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>

          {/* 已有景点快捷填充 */}
          {placeOptions.length ? (
            <div className="quick">
              <p className="form__label">已有景点</p>
              <div className="quick__tags">
                {placeOptions.map((name) => (
                  <span
                    key={name}
                    className="quick__tag"
                    onClick={() => setPlace(name)}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="form__actions">
            <Button round block type="primary" className="form__submit" onClick={handleSubmit}>
              保存
            </Button>
            <Button round block plain onClick={onClose}>
              取消
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
