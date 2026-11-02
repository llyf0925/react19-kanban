export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="搜索任务..."
      style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, width: 240, fontSize: 14 }} />
  )
}
