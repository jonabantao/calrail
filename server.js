const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;
const STATIC_PATH = path.join(__dirname, '/frontend/build');
const queries = require('./backend/queries/query');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH));

app.get('/api/jobs', async (req, res) => {
  try {
    let response = await queries.fetchJobs();

    res.status(200).json(response);
  } catch(e) {
    res.sendStatus(404);
  }
});

app.get('/api/trains', async (req, res) => {
  try {
    let response = await queries.fetchTrains();

    res.status(200).json(response);
  } catch(e) {
    res.sendStatus(500);
  }
});

app.post('/api/trains', async (req, res) => {
  try {
    await queries.addTrain(req.body);

    res.sendStatus(200);
  } catch(e) {
    res.sendStatus(500);
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(`${STATIC_PATH}/index.html`));
});

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}.`);
});
