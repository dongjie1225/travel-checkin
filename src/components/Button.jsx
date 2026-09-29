import React from 'react'

/**
 * 按钮，对应 van-button（只实现本应用用到的几种形态）
 */
export default function Button({
  children,
  type = 'default',
  block = false,
  round = false,
  size = 'normal',
  plain = false,
  loading = false,
  loadingText,
  className = '',
  style,
  ...rest
}) {
  const classes = [
    'van-button',
    `van-button--${type}`,
    block ? 'van-button--block' : '',
    round ? 'van-button--round' : '',
    `van-button--${size}`,
    plain ? 'van-button--plain' : '',
    loading ? 'van-button--loading' : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} style={style} disabled={loading} {...rest}>
      <div className="van-button__content">
        {loading ? (
          <span className="van-button__loading">
            <span className="van-loading__spinner" />
            {loadingText ? <span>{loadingText}</span> : null}
          </span>
        ) : (
          children
        )}
      </div>
    </button>
  )
}
