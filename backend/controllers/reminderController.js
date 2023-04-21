const Reminder = require("../models/reminderModel");
const User = require("../models/userModel");

// @desc    Get reminders
// @route   GET /api/reminders
// @access  Private
const getReminders = async (req, res) => {
	//add sort by oldest, last updated(default), incomplete only, complete only

	let { sort, completionState } = req.query;
    let sortQuery = {updatedAt:"desc"};
    let completionFilter = { user: req.user.id }

    if(sort == "oldest"){
       sortQuery ={ createdAt: 'asc' }
    }

    if(completionState == "complete"){
        completionFilter = { user: req.user.id , isCompleted:true}
    }
    if(completionState == "incomplete"){
        completionFilter = { user: req.user.id , isCompleted:false}
    }

	const reminders = await Reminder.find(completionFilter).sort(sortQuery);
   

	res.status(200).json({
		count: reminders.length,
		reminders,
	});
};

// @desc    Get reminder
// @route   GET /api/reminders/:id
// @access  Private
const getReminder = async (req, res) => {
	const reminder = await Reminder.findById(req.params.id);
	if (!reminder) {
		return res.status(404).json({ message: "Reminder not found" });
	}
	res.json(reminder);
};

// @desc    Create reminder
// @route   POST /api/reminders
// @access  Private
const createReminder = async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a Reminder");
	}

	if (!req.body.dueDate) {
		res.status(400);
		throw new Error("Please add a due Date");
	}

	const reminder = await Reminder.create({
		text: req.body.text,
		dueDate: req.body.dueDate,
		isCompleted: false,
		user: req.user.id,
	});

	res.status(201).json(reminder);
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
const updateReminder = async (req, res) => {
	const reminder = await Reminder.findById(req.params.id);

	if (!reminder) {
		res.status(404);
		throw new Error("Reminder not found");
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Make sure the logged in user matches the reminder user
	if (reminder.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a Reminder");
	}

	if (!req.body.dueDate) {
		res.status(400);
		throw new Error("Please add a due Date");
	}

	if (reminder.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedReminder = await Reminder.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedReminder);
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = async (req, res) => {
	const reminder = await Reminder.findById(req.params.id);

	if (!reminder) {
		res.status(404);
		throw new Error("Reminder not found");
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Make sure the logged in user matches the reminder user
	if (reminder.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await Reminder.findByIdAndRemove(req.params.id);

	res.status(200).json({ id: req.params.id });
};

module.exports = {
	getReminders,
	getReminder,
	createReminder,
	updateReminder,
	deleteReminder,
};
