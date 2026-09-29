# 旅游记录 App（React 版）

> 本项目是 `../travel-checkin/`（Vue 版）的 **React 平替版本**，功能与界面一致。
> 两个项目相互独立，Vue 版代码保持原样未被修改。

一个基于 **React 18 + Vite + React Router 6** 的极简旅游应用，包含「旅游记录」与「旅游记账」两个页面，通过底部导航栏切换。

## 与 Vue 版的对应关系

| Vue 版 | React 版 | 说明 |
|---|---|---|
| `src/main.js` | `src/main.jsx` | 入口，注册 router |
| `src/App.vue` | `src/App.jsx` | 外壳：内容区 + 底部导航 |
| `src/router/index.js` | `src/main.jsx` 内路由表 | 改为 React Router 的 `<Routes>` |
| `src/views/*.vue` | `src/views/*.jsx` | 页面 |
| `src/components/*.vue` | `src/components/*.jsx` | 组件 |
| `src/utils/*.js` | `src/utils/*.js` | 纯逻辑工具，直接复用未改动 |

### 组件对照

| Vue / Vant | React 实现 |
|---|---|
| `van-tabbar` | `App.jsx` 里的 `.van-tabbar` + `NavLink` |
| `van-nav-bar` | `components/NavBar.jsx` |
| `van-cell` / `van-cell-group` | `components/Cell.jsx` + `.list-group` |
| `van-swipe-cell` | `components/SwipeCell.jsx`（自实现拖拽） |
| `van-button` | `components/Button.jsx` |
| `van-popup` | `ExpenseForm.jsx` 内的 `.van-popup__overlay` |
| `van-field` | `ExpenseForm.jsx` 内的原生 `<input>` + `.van-field` 样式 |
| `van-empty` | `components/Empty.jsx`（内联 SVG 插图） |
| `van-icon` | `components/Icon.jsx`（复用 Vant 图标字体 `van-icon-xxx`） |
| `showToast`（命令式） | `components/Toast.js`（命令式，动态挂载 DOM） |

## 功能

### 旅游记录（`/checkin`）

- 打卡记录列表：展示地点、时间（绝对 + 相对），最新记录在最上方并带「最新」标签。
- 打卡按钮固定在列表下方，点击后定位并新增记录。
- 左滑删除单条记录。
- 顶部摘要显示累计打卡次数和最近一次打卡。

### 旅游记账（`/expense`）

- 总开销摘要：总金额、笔数、景点数、花费最高的景点。
- 按景点横向汇总卡片。
- 开销明细列表：景点、分类标签、备注、日期、金额。
- 「记一笔」弹出表单：景点 / 金额 / 分类（门票·餐饮·交通·住宿·购物·其他）/ 备注，已有景点可一键填充。
- 左滑删除。

### 通用

- 底部导航栏在两个页面间切换。
- 数据分别持久化到 `localStorage`：`travel-checkin:records`（打卡）、`travel-expense:records`（记账）。

## 项目结构

```
travel-checkin-react/
├── index.html
├── vite.config.js               # 端口 5181（Vue 版为 5180，两者可同时运行）
├── package.json
└── src/
    ├── main.jsx                 # 入口：HashRouter + 路由表
    ├── App.jsx                  # 外壳：Outlet + 底部导航
    ├── views/
    │   ├── CheckinView.jsx      # 旅游记录页
    │   └── ExpenseView.jsx      # 旅游记账页
    ├── components/
    │   ├── NavBar.jsx           # 顶部导航栏
    │   ├── Cell.jsx             # 列表单元格
    │   ├── SwipeCell.jsx        # 侧滑单元格
    │   ├── Button.jsx           # 按钮
    │   ├── Icon.jsx             # Vant 图标
    │   ├── Toast.js             # 轻提示（命令式）
    │   ├── Empty.jsx            # 空状态
    │   ├── CheckinList.jsx      # 打卡记录列表
    │   ├── CheckinAction.jsx    # 底部打卡按钮
    │   ├── ExpenseList.jsx      # 开销明细列表
    │   └── ExpenseForm.jsx      # 新增开销弹窗表单
    ├── utils/                   # 与 Vue 版完全相同，未改动
    │   ├── location.js
    │   ├── storage.js
    │   ├── expense.js
    │   └── expenseStorage.js
    └── styles/
        ├── global.css           # 全局变量与手机壳容器
        ├── vant-overrides.css   # Vant 组件在 React 下的补丁样式
        └── pages.css            # 页面级样式（从 Vue SFC scoped 迁移）
```

## 运行

```bash
npm install
npm run dev       # 开发，http://127.0.0.1:5181
npm run build     # 生产构建
npm run preview   # 预览构建产物
```

## 关于 UI 组件库

原需求指定用 Vant。Vant 是面向 Vue 的组件库，**没有官方 React 版本**，因此这里的做法是：

1. 仍然安装并使用 Vant 的 **CSS 文件**（`vant/lib/index.css`），保留原有视觉风格；
2. 用 React 组件（`src/components/` 下）复刻所需的 Vant 组件结构与类名（`van-cell`、`van-button`、`van-popup` 等），使样式可直接命中；
3. 图标直接用 Vant 的图标字体 class（`van-icon-location-o` 等），无需额外图标库。

如果后续需要完全脱离 Vant，可以替换为 React 生态的组件库（如 **Ant Design Mobile**、**React Vant** 或 **NutUI-React**），只需改写 `src/components/` 下的包装组件，页面逻辑不用动。

## 说明

- 路由使用 hash 模式（`HashRouter`），静态部署无需服务端重写规则。
- 定位基于 `navigator.geolocation`，地点名称使用内置地点库演示，接入真实项目时请替换 `src/utils/location.js` 中的 `getCurrentLocation`。
- 定位被拒绝或超时会自动回退到内置地点库，打卡流程不会中断。
