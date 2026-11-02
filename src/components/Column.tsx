import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { TaskCard } from './TaskCard'
import type { Task, ColumnId } from '../types'

export interface ColumnDef { id: ColumnId; title: string }

export function Column({ id, title, tasks }: { id: ColumnId; title: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 280,
        minHeight: 300,
        background: '#e2e8f0',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>
        {title} ({tasks.length})
      </h3>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} columnId={id} />
        ))}
      </SortableContext>
    </div>
  )
}
