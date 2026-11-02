import { create } from 'zustand'
import type { Task, ColumnId } from '../types'

interface TaskState {
  tasks: Record<ColumnId, Task[]>
  addTask: (col: ColumnId, task: Omit<Task, 'id' | 'createdAt'>) => void
  moveTask: (taskId: string, from: ColumnId, to: ColumnId) => void
  deleteTask: (col: ColumnId, taskId: string) => void
  updateTask: (col: ColumnId, taskId: string, patch: Partial<Task>) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: { todo: [], doing: [], done: [] },

  addTask: (col, task) =>
    set((s) => ({
      tasks: {
        ...s.tasks,
        [col]: [...s.tasks[col], { ...task, id: crypto.randomUUID(), createdAt: Date.now() }],
      },
    })),

  moveTask: (taskId, from, to) =>
    set((s) => {
      const t = s.tasks[from].find((x) => x.id === taskId)
      if (!t) return s
      return {
        tasks: {
          ...s.tasks,
          [from]: s.tasks[from].filter((x) => x.id !== taskId),
          [to]: [t, ...s.tasks[to]],
        },
      }
    }),

  deleteTask: (col, taskId) =>
    set((s) => ({
      tasks: { ...s.tasks, [col]: s.tasks[col].filter((x) => x.id !== taskId) },
    })),

  updateTask: (col, taskId, patch) =>
    set((s) => ({
      tasks: {
        ...s.tasks,
        [col]: s.tasks[col].map((x) => (x.id === taskId ? { ...x, ...patch } : x)),
      },
    })),
}))
