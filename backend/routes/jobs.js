const express = require('express');
const router = express.Router();
const Job = require('../queries/job');

router.get('/', async (req, res) => {
  try {
    let response = await Job.findAll();

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let response = await Job.findOne(req.params.id);

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    await Job.addOne(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch('/:id', async(req, res) => {
  try {
    await Job.updateOne(req.body);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Job.deleteOne(req.params.id);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/conductor/:empID', async (req, res) => {
  try {
    await Job.removeConductor(req.params.empID);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/engineer/:empID', async (req, res) => {
  try {
    await Job.removeEngineer(req.params.empID);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);

    res.sendStatus(500);
  }
})

module.exports = router;
