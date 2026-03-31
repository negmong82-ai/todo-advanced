const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true,
    trim: true
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  color: { 
    type: String, 
    default: 'white' 
  },
  important: { 
    type: Boolean, 
    default: false 
  },
  dueDate: { 
    type: String, 
    default: null 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Todo', todoSchema);
