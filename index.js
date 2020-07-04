const express = require('express');
const cors = require('cors');
const app = express().use(cors());

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(process.env.PORT || 3000);