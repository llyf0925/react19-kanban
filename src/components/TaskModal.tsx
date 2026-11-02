import { useState } from 'react'
import { z } from 'zod'
import { useTaskStore } from '../store/taskStore'
import type { ColumnId } from '../types'

const taskSchema = z.object({
  title: z.string().min(2, '标题至少 2 个字符'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
})

export function TaskModal({ column, onClose }: { column: ColumnId; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [error, setError] = useState('')
  const addTask = useTaskStore((s) => s.addTask)

  const submit = () => {
    const result = taskSchema.safeParse({ title, description: desc, priority })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    addTask(column, result.data)
    onClose()
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
      onClick={onClose}
    >
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, width: 380 }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: 16 }}>新建任务</h3>
        <label style={{ fontSize: 13, color: '#64748b' }}>标题</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="任务标题"
          style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4 }} />
        <label style={{ fontSize: 13, color: '#64748b', marginTop: 12, display: 'block' }}>描述（选填）</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="任务描述"
          style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4, resize: 'vertical', minHeight: 60 }} />
        <label style={{ fontSize: 13, color: '#64748b', marginTop: 12, display: 'block' }}>优先级</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button key={p} onClick={() => setPriority(p)}
              style={{
                padding: '4px 12px', borderRadius: 4, cursor: 'pointer',
                border: '1px solid ' + (priority === p ? '#4f46e5' : '#cbd5e1'),
                background: priority === p ? '#4f46e5' : '#fff',
                color: priority === p ? '#fff' : '#334155',
              }}>
              {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
            </button>
          ))}
        </div>
        {error && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 8 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer', background: '#fff' }}>取消</button>
          <button onClick={submit} style={{ padding: '8px 16px', border: 'none', borderRadius: 4, cursor: 'pointer', background: '#4f46e5', color: '#fff' }}>创建</button>
        </div>
      </div>
    </div>
  )
}
