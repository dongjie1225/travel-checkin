/**
 * Vant 图标组件（React 版）
 *
 * Vant 4 的图标是字体图标，CSS 类名为 van-icon-xxx。
 * 这里用同名 class 复用 Vant 的图标字体，避免为图标另外引入图标库。
 */
export default function Icon({ name, className = '', style, ...rest }) {
  return (
    <i
      className={`van-icon van-icon-${name} ${className}`.trim()}
      style={style}
      {...rest}
    />
  )
}
