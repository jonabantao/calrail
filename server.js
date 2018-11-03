const express = require('express');
const cors = require('cors');
const path = require ('path');

const app = express();

const PORT = process.env.PORT || 8000;
const STATIC_PATH = path.join(__dirname, '/frontend/build');
const queries = require('./query');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH));

app.get('/api/users', async (req, res) => {
  try {
    let response = await queries.fetchEmployees();
    console.log(response);

    res.status(200).json(response);
  } catch(e) {
    console.log(e);
    res.sendStatus(404);
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(`${STATIC_PATH}/index.html`));
});

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}.`);
});
