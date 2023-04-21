const mongoose = require('mongoose')

const reminderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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