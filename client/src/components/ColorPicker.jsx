import { Palette } from 'lucide-react'

export function ColorPicker({ selectedColor, onColorChange, dropdownOpen, onToggle }) {
  return (
    <div className="color-picker-wrapper">
      <button
        type="button"
        className="action-btn color-palette-btn"
        onClick={onToggle}
        title="색상 선택"
      >
        <Palette size={18} />
      </button>
      {dropdownOpen && (
        <div className="color-dropdown active">
          {['white', 'pink', 'green', 'blue'].map(color => (
            <button
              key={color}
              type="button"
              className={`color-option ${color} ${selectedColor === color ? 'active' : ''}`}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
