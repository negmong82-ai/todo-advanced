import { useState, useEffect } from 'react'
import './index.css'
import { TodoForm } from './components/TodoForm'
import { ListHeader } from './components/ListHeader'
import { TodoItem } from './components/TodoItem'
import { EmptyState } from './components/EmptyState'

const API_URL = 'http://localhost:5005'

function App() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')
  const [todoDate, setTodoDate] = useState('')
  const [selectedColor, setSelectedColor] = useState('white')
  const [isImportant, setIsImportant] = useState(false)
  const [currentSort, setCurrentSort] = useState('input')
  const [hideCompleted, setHideCompleted] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // 초기 로드 - 모든 Todo 조회
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`)
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      console.error('Todo 조회 실패:', err)
    }
  }

  // Todo 추가
  const handleAddTodo = async (e) => {
    e.preventDefault()
    const text = todoText.trim()
    if (!text) return

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          dueDate: todoDate || null,
          important: isImportant,
          color: selectedColor
        })
      })

      if (!res.ok) throw new Error('Failed to add todo')

      await fetchTodos()
      setTodoText('')
      setTodoDate('')
      setSelectedColor('white')
      setIsImportant(false)
    } catch (err) {
      console.error('Todo 추가 실패:', err)
    }
  }

  // Todo 삭제
  const handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete todo')
      await fetchTodos()
    } catch (err) {
      console.error('Todo 삭제 실패:', err)
    }
  }

  // Todo 완료 토글
  const handleToggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id)
    if (!todo) return

    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      })
      if (!res.ok) throw new Error('Failed to update todo')
      await fetchTodos()
    } catch (err) {
      console.error('Todo 토글 실패:', err)
    }
  }

  // Todo 중요도 토글
  const handleToggleImportant = async (id) => {
    const todo = todos.find(t => t._id === id)
    if (!todo) return

    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ important: !todo.important })
      })
      if (!res.ok) throw new Error('Failed to update todo')
      await fetchTodos()
    } catch (err) {
      console.error('중요도 토글 실패:', err)
    }
  }

  // 편집 완료
  const handleFinishEdit = async (id, updates) => {
    if (Object.keys(updates).length > 0) {
      try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        })
        if (!res.ok) throw new Error('Failed to update todo')
        await fetchTodos()
      } catch (err) {
        console.error('Todo 수정 실패:', err)
      }
    }
    setEditingId(null)
  }

  // 정렬 로직
  const sortedTodos = [...todos].sort((a, b) => {
    if (currentSort === 'input') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
    if (currentSort === 'alpha') {
      return a.text.localeCompare(b.text, 'ko-KR')
    }
    if (currentSort === 'date') {
      const dateA = a.dueDate || '9999-99-99'
      const dateB = b.dueDate || '9999-99-99'
      if (dateA !== dateB) return dateA.localeCompare(dateB)
      return a.text.localeCompare(b.text, 'ko-KR')
    }
    if (currentSort === 'important') {
      const impA = a.important ? 1 : 0
      const impB = b.important ? 1 : 0
      if (impA !== impB) return impB - impA
      return a.text.localeCompare(b.text, 'ko-KR')
    }
    if (currentSort === 'color') {
      const colorOrder = { 'blue': 0, 'green': 1, 'pink': 2, 'white': 3 }
      const orderA = colorOrder[a.color || 'white']
      const orderB = colorOrder[b.color || 'white']
      if (orderA !== orderB) return orderA - orderB
      return a.text.localeCompare(b.text, 'ko-KR')
    }
    return 0
  })

  const filteredTodos = hideCompleted ? sortedTodos.filter(t => !t.completed) : sortedTodos

  const today = new Date().toISOString().split('T')[0]
  const isOverdue = (todo) => todo.dueDate && todo.dueDate < today && !todo.completed

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do (Advanced Deployment)</h1>
        <p className="subtitle">Organize your day, simply.</p>
      </header>

      <TodoForm
        todoText={todoText}
        setTodoText={setTodoText}
        todoDate={todoDate}
        setTodoDate={setTodoDate}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        isImportant={isImportant}
        setIsImportant={setIsImportant}
        onSubmit={handleAddTodo}
      />

      <ListHeader
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
      />

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <EmptyState />
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              isEditing={editingId === todo._id}
              isOverdue={isOverdue(todo)}
              onToggle={handleToggleTodo}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDeleteTodo}
              onStartEdit={() => setEditingId(todo._id)}
              onFinishEdit={handleFinishEdit}
            />
          ))
        )}
      </ul>

      <footer className="app-footer">
        <p className="company-name">NegMong(송주엽)</p>
        <p className="company-slogan">Everything you need, All in one.</p>
      </footer>
    </div>
  )
}

export default App
