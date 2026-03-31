import { useState } from 'react'
import { Plus, Calendar, Flag } from 'lucide-react'
import { ColorPicker } from './ColorPicker'

export function TodoForm({
  todoText,
  setTodoText,
  todoDate,
  setTodoDate,
  selectedColor,
  setSelectedColor,
  isImportant,
  setIsImportant,
  onSubmit
}) {
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false)

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setColorDropdownOpen(false)
  }

  return (
    <form className={`todo-form color-${selectedColor}`} onSubmit={onSubmit}>
      <div className="input-wrapper">
        <div className="text-content-wrapper">
          <input
            type="text"
            id="todo-input"
            placeholder="오늘 할 일"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            autoComplete="off"
            required
          />
          <span className={`selected-date-display ${todoDate ? 'active' : ''}`}>
            {todoDate}
          </span>
        </div>
        <div className="form-actions">
          <div className={`date-btn-wrapper ${todoDate ? 'has-value' : ''}`} title="마감 날짜 선택">
            <input
              type="date"
              id="todo-date"
              value={todoDate}
              onChange={(e) => setTodoDate(e.target.value)}
              aria-label="마감 날짜 선택"
            />
            <Calendar size={18} className="calendar-icon" />
          </div>

          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
            dropdownOpen={colorDropdownOpen}
            onToggle={() => setColorDropdownOpen(!colorDropdownOpen)}
          />

          <button
            type="button"
            className={`important-toggle-btn ${isImportant ? 'active' : ''}`}
            onClick={() => setIsImportant(!isImportant)}
            title="중요 표시"
          >
            <Flag size={18} className={isImportant ? 'filled-flag' : ''} />
          </button>
        </div>
      </div>
      <button type="submit" className="add-btn" aria-label="할 일 추가">
        <Plus size={20} />
      </button>
    </form>
  )
}
