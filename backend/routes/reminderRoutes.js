const express = require('express')
const router = express.Router()
const {
    getReminders,
    setReminder,
    updateReminder,
    deleteReminder,
} = require('../controllers/reminderController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReminders).post(protect, setReminder)
router.route('/:id').delete(protect, deleteReminder).put(protect, updateReminder)

module.exports = router