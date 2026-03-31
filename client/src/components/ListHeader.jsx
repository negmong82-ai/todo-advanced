import { CheckCircle2, ChevronDown } from 'lucide-react'

export function ListHeader({ hideCompleted, setHideCompleted, currentSort, setCurrentSort }) {
  return (
    <div className="list-header">
      <h2 className="list-title">My Tasks</h2>
      <div className="list-controls">
        <button
          type="button"
          id="toggle-completed-btn"
          className={`filter-btn ${hideCompleted ? 'active' : ''}`}
          onClick={() => setHideCompleted(!hideCompleted)}
          title="완료된 일정 숨기기"
        >
          <CheckCircle2 size={16} />
          <span>{hideCompleted ? '진행 중' : '완료 보임'}</span>
        </button>
        <div className="sort-wrapper">
          <select
            id="sort-select"
            className="sort-select"
            value={currentSort}
            onChange={(e) => setCurrentSort(e.target.value)}
          >
            <option value="input">입력순</option>
            <option value="important">중요도순</option>
            <option value="date">날짜순</option>
            <option value="color">컬러순</option>
            <option value="alpha">가나다순</option>
          </select>
          <ChevronDown size={14} className="sort-icon-down" />
        </div>
      </div>
    </div>
  )
}
