import { useState } from 'react'
import { Pencil, Trash2, Flag, Calendar, X } from 'lucide-react'
import { ColorPicker } from './ColorPicker'

export function TodoItem({
  todo,
  isEditing,
  isOverdue,
  onToggle,
  onToggleImportant,
  onDelete,
  onStartEdit,
  onFinishEdit
}) {
  const [editText, setEditText] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editColor, setEditColor] = useState('white')
  const [editImportant, setEditImportant] = useState(false)
  const [editColorDropdownOpen, setEditColorDropdownOpen] = useState(false)

  const handleStartEdit = () => {
    setEditText(todo.text)
    setEditDate(todo.dueDate || '')
    setEditColor(todo.color || 'white')
    setEditImportant(todo.important || false)
    setEditColorDropdownOpen(false)
    onStartEdit(todo)
  }

  const handleFinishEdit = () => {
    const newText = editText.trim()
    if (!newText) {
      return
    }

    const updates = {}
    if (newText !== todo.text) updates.text = newText
    if (editDate !== (todo.dueDate || '')) updates.dueDate = editDate || null
    if (editColor !== (todo.color || 'white')) updates.color = editColor
    if (editImportant !== (todo.important || false)) updates.important = editImportant

    if (Object.keys(updates).length > 0) {
      onFinishEdit(todo._id, updates)
    } else {
      onFinishEdit(todo._id, {})
    }
  }

  const handleEditColorChange = (color) => {
    setEditColor(color)
    setEditColorDropdownOpen(false)
  }

  return (
    <li className={`todo-item color-${todo.color || 'white'} ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div className="edit-wrapper">
          <div className="text-content-wrapper">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <span className={`selected-date-display ${editDate ? 'active' : ''}`}>
              {editDate}
            </span>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="action-btn clear-input-btn"
              onClick={() => setEditText('')}
              title="지우기"
            >
              <X size={16} />
            </button>
            <div className={`date-btn-wrapper ${editDate ? 'has-value' : ''}`}>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
              <Calendar size={18} className="calendar-icon" />
            </div>

            <ColorPicker
              selectedColor={editColor}
              onColorChange={handleEditColorChange}
              dropdownOpen={editColorDropdownOpen}
              onToggle={() => setEditColorDropdownOpen(!editColorDropdownOpen)}
            />

            <button
              type="button"
              className={`important-toggle-btn ${editImportant ? 'active' : ''}`}
              onClick={() => setEditImportant(!editImportant)}
              title="중요 표시"
            >
              <Flag size={18} className={editImportant ? 'filled-flag' : ''} />
            </button>
          </div>
          <button
            type="button"
            className="edit-complete-btn"
            onClick={handleFinishEdit}
          >
            완료
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
          />
          <div className="todo-item-main">
            <div className="todo-item-content">
              <div className="todo-title-row">
                <button
                  type="button"
                  className={`important-toggle-btn ${todo.important ? 'active' : ''}`}
                  onClick={() => onToggleImportant(todo._id)}
                  title="중요 표시"
                >
                  <Flag size={18} className={todo.important ? 'filled-flag' : ''} />
                </button>
                <span className={`todo-text ${todo.important ? 'important-text' : ''}`}>
                  {todo.text}
                </span>
              </div>
              {todo.dueDate && (
                <div className={`todo-date ${isOverdue ? 'overdue' : ''}`}>
                  <span>{todo.dueDate}</span>
                </div>
              )}
            </div>
          </div>
          <div className="todo-actions">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={handleStartEdit}
              aria-label="할 일 수정"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(todo._id)}
              aria-label="할 일 삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  )
}
