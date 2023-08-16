const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const path = require('path');
const cors = require('cors')

const plantsData = JSON.parse(fs.readFileSync('data/plants.json'));
const plants = plantsData.data;

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

app.post('/plants', (req, res) => {
  const newPlant = req.body;
  plants.push(newPlant);
  res.status(201).json(newPlant);
});

app.put('/plants/:id', (req, res) => {
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