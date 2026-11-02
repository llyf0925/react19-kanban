import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { Column, type ColumnDef } from './Column'
import { useTaskStore } from '../store/taskStore'
import type { ColumnId, Task } from '../types'

const columns: ColumnDef[] = [
  { id: 'todo', title: '待办' },
  { id: 'doing', title: '进行中' },
  { id: 'done', title: '完成' },
]

export function Board() {
  const tasks = useTaskStore((s) => s.tasks)
  const moveTask = useTaskStore((s) => s.moveTask)

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return
    const taskId = String(active.id)
    const to = String(over.id) as ColumnId
    const from = (Object.keys(tasks) as ColumnId[]).find((c) =>
      tasks[c].some((t) => t.id === taskId)
    )
    if (from && from !== to) moveTask(taskId, from, to)
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: 16, padding: 24, overflowX: 'auto' }}>
        {columns.map((c) => (
          <Column key={c.id} id={c.id} title={c.title} tasks={tasks[c.id]} />
        ))}
      </div>
    </DndContext>
  )
}
