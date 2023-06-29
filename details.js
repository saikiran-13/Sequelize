const Joi = require('joi');
const schema = require('./validation');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/details', (req, res) => {
  console.log(req.body);
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(404).json({ message: error.details });
  } else {
    console.log(value);
    res.status(200).json({ message: 'Validation successful!!!' });
  }
});
app.listen(3500);
