import { Column, type ColumnDef } from './Column'
import { useTaskStore } from '../store/taskStore'
import type { ColumnId } from '../types'

const columns: ColumnDef[] = [
  { id: 'todo', title: '待办' },
  { id: 'doing', title: '进行中' },
  { id: 'done', title: '完成' },
]

export function Board() {
  const tasks = useTaskStore((s) => s.tasks)

  // TODO: 第 4 天你要在这里接 dnd-kit（DndContext + SortableContext）
  // 现在先静态渲染三列，等你把 store 的 moveTask 实现好之后再补拖拽
  return (
    <div style={{ display: 'flex', gap: 16, padding: 24, overflowX: 'auto' }}>
      {columns.map((c) => (
        <Column key={c.id} id={c.id} title={c.title} tasks={tasks[c.id]} />
      ))}
    </div>
  )
}
