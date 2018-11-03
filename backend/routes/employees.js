const express = require('express');
const router = express.Router();
const Employee = require('../queries/employee');

router.get('/', async (req, res) => {
  try {
    let response = await Employee.findAll();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
