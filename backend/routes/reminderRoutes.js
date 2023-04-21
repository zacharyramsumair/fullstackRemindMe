const express = require('express')
const router = express.Router()
const {
    getReminders,
    getReminder,
    createReminder,
    updateReminder,
    deleteReminder,
} = require('../controllers/reminderController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReminders).post(protect, createReminder)
router.route('/:id').delete(protect, deleteReminder).put(protect, updateReminder).get(protect, getReminder)

module.exports = router