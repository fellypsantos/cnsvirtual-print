const {Router} = require('express');
const stream = require('stream');
const routes = Router();
const helper = require('./helper');

routes.get('/generatePDF/:userB64', async (request, response) => {
  const user = JSON.parse(helper.Base64.atob(request.params.userB64));
  const cardImageB64 = await helper.generateCardImageBase64(user);
  const pdfBuffer = await helper.generateHTML2PDF(cardImageB64);

  const fileContents = Buffer.from(pdfBuffer, 'binary');
  const readStream = new stream.PassThrough();
  readStream.end(fileContents);

  response.set('Content-disposition', 'attachment; filename=' + `${user.nome}.pdf`);
  response.set('Content-Type', 'application/pdf');

  readStream.pipe(response);
})

module.exports = routes;
