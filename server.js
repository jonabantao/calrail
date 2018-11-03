const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;
const STATIC_PATH = path.join(__dirname, '/frontend/build');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH));

// Routes
const jobs = require('./backend/routes/jobs');
const employees = require('./backend/routes/employees');
const trains = require('./backend/routes/trains');
const terminals = require('./backend/routes/terminals');
const certifications = require('./backend/routes/certifications');

app.use('/api/jobs', jobs);
app.use('/api/employees', employees);
app.use('/api/trains', trains);
app.use('/api/terminals', terminals);
app.use('/api/certifications', certifications);

// React App
app.get('*', (req, res) => {
  res.sendFile(path.join(`${STATIC_PATH}/index.html`));
});


app.listen(PORT, () => {
  console.log(`App up on port ${PORT}.`);
});
