const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
    default: 'Pending',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Middleware to update status based on dueDate
taskSchema.pre('save', function(next) {
  if (this.dueDate < new Date() && this.status !== 'Completed') {
    this.status = 'Overdue';
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
