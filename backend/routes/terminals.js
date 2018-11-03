const express = require('express');
const router = express.Router();
const Terminal = require('../queries/terminal');

router.get('/', async (req, res) => {
  try {
    let response = await Terminal.findAll();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
