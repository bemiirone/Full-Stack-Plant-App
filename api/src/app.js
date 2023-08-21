const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;
const plantsData = JSON.parse(fs.readFileSync('data/plants.json'));
const plants = plantsData.data;

const validatePlant = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('family').isLength({ min: 1 }).withMessage('Family is required'),
  check('year').isInt({ min: 1 }).withMessage('Year must be a positive integer'),
  check('slug').isLength({ min: 1 }).withMessage('Slug is required')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.get('/plants', (req, res) => {
  res.json(plants);
});

app.get('/plants/:id', (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).send('Plant not found');
  }
});

app.post('/plants', validatePlant, handleValidationErrors, (req, res) => {
  const newPlant = req.body;
  const existingPlant = plants.find(p => p.id === newPlant.id);
  if (existingPlant) {
    return res.status(400).send('A plant with the same ID already exists');
  }

  plants.push(newPlant);
  res.status(201).json(newPlant);
});

app.put('/plants/:id', validatePlant, handleValidationErrors, (req, res) => {
  const plant = plants.find(p => p.id === parseInt(req.params.id));
  if (plant) {
    Object.assign(plant, req.body);
    res.json(plant);
  } else {
    res.status(404).send('Plant not found');
  }
});

app.delete('/plants/:id', (req, res) => {
  const index = plants.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    plants.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Plant not found');
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});