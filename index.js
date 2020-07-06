const express = require('express');
const cors = require('cors');
const app = express().use(cors());
const routes = require('./src/routes');

app.use(routes);

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.send('Ambiente para geração de PDF do Cartão do SUS.');
});

app.listen(process.env.PORT || 3000);