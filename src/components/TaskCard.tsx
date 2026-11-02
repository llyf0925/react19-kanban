import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task, ColumnId } from '../types'

export function TaskCard({ task, columnId }: { task: Task; columnId: ColumnId }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: '#fff',
    borderRadius: 6,
    padding: 12,
    cursor: 'grab',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ fontWeight: 500, fontSize: 14 }}>{task.title}</div>
      {task.description && (
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{task.description}</div>
      )}
      <div style={{ marginTop: 8, fontSize: 11 }}>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 4,
            background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#dbeafe',
            color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#2563eb',
          }}
        >
          {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
        </span>
      </div>
    </div>
  )
}
