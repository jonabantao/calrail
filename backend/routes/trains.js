const express = require('express');
const router = express.Router();
const Train = require('../queries/train');

router.get('/', async (req, res) => {
  try {
    let response = await Train.findAll();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    await queries.addTrain(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
