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

router.get('/certifications', async (req, res) => {
  try {
    let response;

    if (req.query.title) {
      response = await Employee.findCertificationsByTitle(req.query.title);
    } else {
      response = await Employee.findAllWithCertifications();
    }

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/engineers', async (req, res) => {
  try {
    let response = await Employee.findAllEngineers();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/conductors', async (req, res) => {
  try {
    let response = await Employee.findAllConductors();

    res.status(200).json(response);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let response = await Employee.findOne(req.params.id);

    res.status(200).json(response[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    await Employee.addOne(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/certifications', async (req, res) => {
  try {
    await Employee.addCertification(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:empID/certifications/:certID', async (req, res) => {
  try {
    await Employee.deleteCertification(req.params.empID, req.params.certID);

    res.sendStatus(200)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.deleteOne(req.params.id);

    res.sendStatus(200)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Employee.updateOne(req.params.id, req.body);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
