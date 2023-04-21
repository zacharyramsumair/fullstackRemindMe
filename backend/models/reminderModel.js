const mongoose = require('mongoose')

const reminderSchema = mongoose.Schema(
  {
    text: {
        type: String,
        required: true
      },
      dueDate: {
        type: Date,
        required: true
      },
      isCompleted: {
        type: Boolean,
        default: false
      }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Reminder', reminderSchema)