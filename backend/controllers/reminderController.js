
const Reminder = require('../models/reminderModel')
const User = require('../models/userModel')

// @desc    Get reminder
// @route   GET /api/reminder
// @access  Private
const getReminders = async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.id })

  res.status(200).json(goals)
}

// @desc    Set reminder
// @route   POST /api/reminders
// @access  Private
const setReminder = async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const reminder = await Reminder.create({
    // text: req.body.text,
    // user: req.user.id,
  })

  res.status(200).json(reminder)
}

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
const updateReminder = async (req, res) => {
  const reminder = await Reminder.findById(req.params.id)

  if (!reminder) {
    res.status(400)
    throw new Error('Reminder not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the reminder user
  if (reminder.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedReminder)
}

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = async (req, res) => {
  const reminder = await Reminder.findById(req.params.id)

  if (!reminder) {
    res.status(400)
    throw new Error('Reminder not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the reminder user
  if (reminder.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await reminder.remove()

  res.status(200).json({ id: req.params.id })
}

module.exports = {
  getReminders,
  setReminder,
  updateReminder,
  deleteReminder,
}