import { useState } from 'react'
import { useTaskStore } from '../store/taskStore'
import type { ColumnId, Task } from '../types'

interface Props {
  column: ColumnId
  initialTask?: Task & { column: ColumnId } // 有 initialTask 就是编辑模式
  onClose: () => void
}

export function TaskModal({ column, initialTask, onClose }: Props) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [desc, setDesc] = useState(initialTask?.description ?? '')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTask?.priority ?? 'medium')
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)

  // TODO: 第 3 天你要在这里加 Zod 校验 + 提交逻辑（新建调 addTask，编辑调 updateTask）
  // 提示:参考 D:\2026\React19练习\答案\src\02-进阶篇\ex03_Zod类型校验.tsx
  const submit = () => {
    // TODO
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 8, padding: 24, width: 380 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 16 }}>{initialTask ? '编辑任务' : '新建任务'}</h3>

        <label style={{ fontSize: 13, color: '#64748b' }}>标题</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="任务标题"
          style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1', borderRadius: 4, marginTop: 4 }}
        />

        <label style={{ fontSize: 13, color: '#64748b', marginTop: 12, display: 'block' }}>描述（选填）</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="任务描述"
          style={{
            width: '100%',
            padding: 8,
            border: '1px solid #cbd5e1',
            borderRadius: 4,
            marginTop: 4,
            resize: 'vertical',
            minHeight: 60,
          }}
        />

        <label style={{ fontSize: 13, color: '#64748b', marginTop: 12, display: 'block' }}>优先级</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              style={{
                padding: '4px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                border: '1px solid ' + (priority === p ? '#4f46e5' : '#cbd5e1'),
                background: priority === p ? '#4f46e5' : '#fff',
                color: priority === p ? '#fff' : '#334155',
              }}
            >
              {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: 4,
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            取消
          </button>
          <button
            onClick={submit}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              background: '#4f46e5',
              color: '#fff',
            }}
          >
            {initialTask ? '保存' : '创建'}
          </button>
        </div>
      </div>
    </div>
  )
}
