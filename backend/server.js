require('dotenv').config();
require('express-async-errors');

const path = require('path');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');

const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./database/db');
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes')
const reminderRoutes = require('./routes/reminderRoutes')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/reminders', reminderRoutes);
app.use('/api/users', userRoutes);

// Serve frontend

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));