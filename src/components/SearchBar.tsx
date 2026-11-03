export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  // TODO: 第 2 天你要把这个搜索词传给 Board，让 Board 过滤卡片
  // 现在这个组件本身不用改，改的是 App.tsx 怎么把 search 传下去
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="搜索任务..."
      style={{
        padding: '8px 12px',
        border: '1px solid #cbd5e1',
        borderRadius: 6,
        width: 240,
        fontSize: 14,
      }}
    />
  )
}
