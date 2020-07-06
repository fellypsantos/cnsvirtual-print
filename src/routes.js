const {Router} = require('express');
const stream = require('stream');
const pdfgen = require('html-pdf');
const routes = Router();

routes.get('/generatePDF', (request, response) => {
  pdfgen
    .create(htmlTemplate)
    .toBuffer((err, buffer) => {
      const fileContents = Buffer.from(buffer, 'binary');
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);

      response.set('Content-disposition', 'attachment; filename=' + `${new Date().getTime()}.pdf`);
      response.set('Content-Type', 'application/pdf');

      readStream.pipe(response);
    })

  // response.json({ file: 'name.pdf' });
})

module.exports = routes;

/**
 * 
 * 1 -> pegar os dados e gerar a foto do cartão em base64
 * 2 -> usar o base64 do cartão e jogar dentro do HTMl pra montar o PDF
 * 3 -> iniciar o download
 * 
 */