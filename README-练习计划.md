# React19 Kanban 一周练习计划（含完整开发流程）

> 这份文档是给你**练习用**的。每一天的任务都写了"要做哪几个文件、打开什么、看什么现象"。
> 跟着做，比直接看答案更能感受 React 的完整流程（写组件 → 状态 → 事件 → 校验 → 持久化 → 部署）。
> 做完当天想对照答案，去 `D:\2026\React19练习\答案\` 翻同名练习（ex04 受控表单 / ex07 Zod / ex09 Zustand 直接对口）。

---

## 第 0 天：先把项目跑起来（10 分钟，一次性）

**目标**：确认环境能跑，看到看板页面。

**步骤**：
1. 打开终端，进入项目目录：
   ```
   cd D:\2026\kanban
   ```
2. 安装依赖（第一次跑要装，之后不用重复）：
   ```
   D:\develop\npm.cmd install
   ```
   看到 `added xxx packages` 就是装好了。
3. 启动开发服务器：
   ```
   D:\develop\npm.cmd run dev
   ```
   终端会显示一个地址（通常是 `http://localhost:5173`）。
4. 浏览器打开这个地址。

**你该看到什么**：
- 三列看板（待办 / 进行中 / 完成），每列是灰底圆角卡片。
- 点右上角「+ 新建任务」，弹出表单：填标题（至少 2 字符）、选优先级，点「创建」。
- 新任务出现在「待办」列，用鼠标**按住卡片拖到另一列**，卡片跟着动。

**感受一下（这就是 React 的核心循环）**：
- 你点按钮 → React 重新渲染 → 界面变化。你不需要懂原理，先记住"改状态，界面自动跟着变"。

---

## 第 1 天：让数据刷新不丢（localStorage 持久化）

**现状**：你现在新建的任务，刷新浏览器就全没了（数据只在内存里）。今天要让它"存进浏览器"。

**要动的文件**：`src/hooks/useLocalStorage.ts`（已经有完整实现，你照着看一遍就行）+ 改 `src/store/taskStore.ts`。

**步骤**：
1. 先打开 `src/hooks/useLocalStorage.ts`，把里面的 `useLocalStorage` 函数**从头读一遍**（就 20 行，很关键）。读的时候搞清楚三件事：
   - 它怎么用 `useState` 存值的？
   - 它怎么用 `useEffect` 在"值变了之后"写入 `localStorage`？（注意 `useEffect` 的依赖数组 `[key, value]`）
   - 它怎么在初始化时从 `localStorage` 读回来的？
   - > 这是你练习 ex05 已经做过的东西，现在实际用到真实项目里。
2. 打开 `src/store/taskStore.ts`。现在的 store 里 `tasks: { todo: [], doing: [], done: [] }` 是**硬编码的空数组**，每次刷新都重置。
3. **你的任务**：让这个 store 在初始时从 `localStorage` 读取已存的任务，在每次增删改时写回 `localStorage`。
   - 提示：Zustand 的 store 里可以直接调用 `localStorage`。最简单的方式是把 `tasks` 的初始值改成"从 localStorage 读，没有就空数组"。
   - 提示：在每个 action（`addTask`/`moveTask`/`deleteTask`/`updateTask`）的 `set` 之后，把新的 `tasks` 写进 `localStorage`。
4. 保存后浏览器自动热更新（Vite 的 HMR，你改文件页面会自己刷新）。
5. **验证**：新建 2-3 个任务 → 刷新浏览器 → 任务还在 ✅

**做完你感受到什么**：React 的 `useState`/`useEffect` 不只是"改变界面"，还能"把数据落到浏览器存储里"，这是数据持久化的基本功。

---

## 第 2 天：搜索过滤真正生效

**现状**：顶部那个搜索框现在是占位（`SearchBar.tsx` 只是显示，没接逻辑）。今天让它真正过滤卡片。

**要动的文件**：`src/components/SearchBar.tsx`、`src/components/Board.tsx`、`src/App.tsx`。

**步骤**：
1. 现在 `App.tsx` 里有个 `search` 的 state，但没传给看板。把 `search` 作为 props 传给 `Board`。
2. 在 `Board.tsx` 里，渲染每个 Column 之前，先用 `search` 过滤该列的 `tasks`（`title` 或 `description` 包含关键词才显示）。
3. 保存，输入搜索词，看卡片实时增减。

**感受一下**：这是典型的"一个 state 驱动多处渲染"——你只存了一份搜索词，三个列的显示都跟着变，这就是 React 声明式的好处。

**扩展（可选）**：加一个"按优先级筛选"的下拉框，复用同一套过滤逻辑。

---

## 第 3 天：编辑已有任务（弹窗复用）

**现状**：弹窗只能"新建"，不能"改已有任务"。今天让同一个弹窗既能新建也能编辑。

**要动的文件**：`src/components/TaskModal.tsx`、`src/components/TaskCard.tsx`、`src/components/Board.tsx`。

**步骤**：
1. 给 `TaskModal` 加一个可选的 prop：`initialTask`（如果传了，就是编辑模式；不传就是新建模式）。
2. 编辑模式下，标题/描述/优先级的输入框**初始值**用 `initialTask` 的内容（而不是空字符串）。
3. 编辑模式下，提交时调用 store 的 `updateTask`（而不是 `addTask`）。
4. 在 `TaskCard.tsx` 上加一个「编辑」按钮（点卡片本身是拖拽，按钮要用 `onMouseDown` 阻止拖拽，不然点按钮会开始拖动——**这是拖拽类项目最常见的坑，你一定会遇到**）。
5. 保存测试：改一个任务的标题 → 刷新 → 改动还在（依赖第 1 天的持久化）。

**做完你感受到什么**：组件"同一个、两种用法"（新建/编辑）是通过 props 区分的，这是 React 组件复用的核心思想。

---

## 第 4 天：删除任务 + 列内排序

**要做的两件事**：
1. **删除**：在 `TaskCard` 上加一个删除按钮，调用 store 的 `deleteTask`。
2. **列内排序**：现在 dnd-kit 只实现了"拖到别的列"，没实现"在同一列里拖动卡片调整顺序"。

**步骤**：
1. 删除好做，直接接 `deleteTask`。
2. 列内排序：`Board.tsx` 的 `onDragEnd` 现在只处理"跨列"。补一段逻辑：如果拖动的目标还在**同一列**，要根据拖放位置更新该列内任务的顺序（store 里 tasks 是数组，顺序就是显示顺序）。
   - 提示：dnd-kit 的 `SortableContext` 已经提供了排序能力，关键是 `onDragEnd` 里拿到 `active` 和 `over` 算出新的索引，然后 `arrayMove`。

**做完你感受到什么**：数组的顺序在 React 里就是渲染顺序，理解"数据顺序 = 界面顺序"是列表类应用的根基。

---

## 第 5 天：细节打磨（空状态 / 任务详情 / 筛选）

**今天不写新功能，全是"体验"层面的事**（这也是真实项目花时间的地方）：

1. **空状态**：某一列一个任务都没有时，显示一句提示（如"把任务拖到这里"），别让用户对着空白发呆。
2. **任务详情**：点卡片（非按钮区域）展开，显示完整描述 + 创建时间。
3. **优先级筛选**：第 2 天的筛选做完了就顺手接上。
4. **动画**：卡片进入/离开加个简单的 CSS transition（`opacity` / `transform`），让界面不那么"死板"。

**感受一下**：真实开发 70% 的时间其实在处理这些"边角"，功能本身反而快。

---

## 第 6 天：写 README（这是简历要看的）

**今天不写代码，写"项目介绍"**。README 是面试官/HR 看到你的第一个东西。

**要写进 `README.md` 的内容**（照着填，别空泛）：
1. **项目一句话**：基于 React19 + TypeScript 的看板应用，支持拖拽、持久化、搜索。
2. **功能清单**：用列表列你能做的每个功能（拖拽/新建/编辑/删除/搜索/筛选/持久化）。
3. **技术栈**：React 19、TypeScript、Vite、Zustand、dnd-kit、Zod。
4. **怎么运行**：`npm install` → `npm run dev`。
5. **截图**：截 2-3 张图（看板全貌、新建弹窗、拖拽过程）放进仓库。
6. **遇到的坑**：写 1-2 个（比如拖拽按钮误触发、dnd-kit 列内排序），**这条最加分**，说明你真做了。
7. **部署链接**：第 7 天部署好之后补上。

---

## 第 7 天：部署上线

**目标**：把项目发到网上，有个可访问的 URL。

**方案 A：Cloudflare Pages（推荐，国内访问快，免费，不用手机号）**
1. 打开 https://pages.cloudflare.com 注册/登录。
2. "Create a project" → "Connect to Git" → 授权 GitHub → 选 `llyf0925/react19-kanban`。
3. 构建配置保持默认（它会识别 `npm run build`，输出 `dist`）。点部署。
4. 1-2 分钟得到 `xxx.pages.dev` 的链接。

**方案 B：Vercel（你之前试过，国内注册要手机号，能注册就用这个）**
1. 打开 https://vercel.com → Import 你的 GitHub 仓库。
2. 框架自动识别为 Vite，直接 Deploy。

**部署完**：
- 把线上链接写进 README。
- 之后每次 `git add . && git commit -m "..." && git push`，Cloudflare/Vercel 自动重新部署（这就是 CI/CD 的概念，简历上可以写"实现了自动部署"）。

---

## 附：每天对应的练习答案（卡住了对照用）

| 今天做的 | 对口练习（在 D:\2026\React19练习\答案\src\） |
|---|---|
| D1 localStorage 持久化 | `02-进阶篇/ex01_自定义Hook.tsx`（useLocalStorage） |
| D2 搜索过滤 | `01-基础篇/ex03_列表与条件渲染.tsx`（条件渲染） |
| D3 受控表单/编辑 | `01-基础篇/ex04_受控表单.tsx`（受控表单+校验） |
| D3/弹窗校验 | `02-进阶篇/ex03_Zod类型校验.tsx`（Zod） |
| D4 Zustand 状态 | `02-进阶篇/ex05_Zustand全局状态.tsx` |
| D4 dnd 排序 | 练习里没有，用 dnd-kit 文档的 SortableContext 示例 |

---

## 最后提醒（真实开发流程，你已经完整走了一遍）

你这一周做的事，其实就是**前端开发的完整流程**：
```
起项目 → 写组件 → 管状态 → 接事件 → 表单校验 → 数据持久化 →
加交互(拖拽) → 细节打磨 → 写README → git推送 → 自动部署上线
```
简历上可以这么写这个项目：
> 基于 React 19 + TypeScript + Vite 的看板应用，使用 Zustand 管理全局状态、dnd-kit 实现拖拽、Zod 做表单校验、localStorage 持久化；通过 Cloudflare Pages 实现 Git 推送自动部署。
