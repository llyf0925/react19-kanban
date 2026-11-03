import { useState } from 'react'
import { Board } from './components/Board'
import { TaskModal } from './components/TaskModal'
import { SearchBar } from './components/SearchBar'
import type { ColumnId, Task } from './types'

export default function App() {
  const [showModal, setShowModal] = useState<ColumnId | null>(null)
  const [editingTask, setEditingTask] = useState<(Task & { column: ColumnId }) | null>(null)
  const [search, setSearch] = useState('')

  // TODO: 第 3 天你要加一个「点击卡片编辑」的入口，把 editingTask 设成那个任务
  // 第 2 天你要把 search 传给 Board（现在 Board 没接 search 的 prop）

  return (
    <div style={{ minHeight: '100vh' }}>
      <header
        style={{
          padding: '16px 24px',
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 600 }}>React19 Kanban</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} />
          <button
            onClick={() => {
              setEditingTask(null)
              setShowModal('todo')
            }}
            style={{
              padding: '8px 16px',
              background: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            + 新建任务
          </button>
        </div>
      </header>
      <Board />
      {showModal && (
        <TaskModal
          column={showModal}
          initialTask={editingTask ?? undefined}
          onClose={() => {
            setShowModal(null)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}
