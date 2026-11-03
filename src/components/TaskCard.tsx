import type { Task, ColumnId } from '../types'

export function TaskCard({ task, columnId }: { task: Task; columnId: ColumnId }) {
  // TODO: 第 3 天你要加「编辑」「删除」按钮（注意按钮 onMousedown 阻止拖拽）
  // TODO: 第 4 天你要让这张卡片变成 sortable（useSortable）
  // 现在先静态渲染
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 6,
        padding: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
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
