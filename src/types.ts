export type ColumnId = 'todo' | 'doing' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  createdAt: number
}
