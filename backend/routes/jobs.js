const express = require('express');
const router = express.Router();
const Job = require('../queries/job');

router.get('/', async (req, res) => {
  try {
    let response = await Job.findAll();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
