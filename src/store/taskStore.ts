import { create } from 'zustand'
import type { Task, ColumnId } from '../types'

// TODO: 这是你要练的核心。下面只给了骨架（空 tasks + 空的 action 占位），
// 第 1 天你要:让 tasks 从 localStorage 初始化 + 每个 action 写回 localStorage
// 第 4 天你要:实现 deleteTask 和列内排序
interface TaskState {
  tasks: Record<ColumnId, Task[]>
  addTask: (col: ColumnId, task: Omit<Task, 'id' | 'createdAt'>) => void
  moveTask: (taskId: string, from: ColumnId, to: ColumnId) => void
  deleteTask: (col: ColumnId, taskId: string) => void
  updateTask: (col: ColumnId, taskId: string, patch: Partial<Task>) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: { todo: [], doing: [], done: [] },

  addTask: (_col, _task) => {
    // TODO: 在 _col 里推入 _task（补上 id 和 createdAt）
  },
  moveTask: (_taskId, _from, _to) => {
    // TODO: 把 _taskId 从 _from 移到 _to
  },
  deleteTask: (_col, _taskId) => {
    // TODO: 从 _col 删掉 _taskId
  },
  updateTask: (_col, _taskId, _patch) => {
    // TODO: 用 _patch 覆盖 _taskId 的字段
  },
}))
