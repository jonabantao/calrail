const express = require('express');
const router = express.Router();
const Certification = require('../queries/certification');

router.get('/', async (req, res) => {
  try {
    let response = await Certification.findAll();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    await Certification.addOne(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Certification.deleteOne(req.params.id);

    res.sendStatus(200);
  } catch (e) {
    if (e.code === 'ER_CONDUCTOR_ENGINEER_DELETE_NOT_ALLOWED') {
      return res.sendStatus(409);
    } 

    res.sendStatus(500);
  }
});

module.exports = router;
