import { Inbox } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="empty-state">
      <Inbox size={48} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
      <p>아직 등록된 할 일이 없어요.</p>
      <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>새로운 할 일을 추가해 보세요!</p>
    </div>
  )
}
