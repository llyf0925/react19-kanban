import { TaskCard } from './TaskCard'
import type { Task, ColumnId } from '../types'

export interface ColumnDef { id: ColumnId; title: string }

export function Column({ id, title, tasks }: { id: ColumnId; title: string; tasks: Task[] }) {
  // TODO: 第 4 天你要把这一列变成 droppable（useDroppable）
  // 现在先静态渲染卡片列表
  return (
    <div
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
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} columnId={id} />
      ))}
    </div>
  )
}
