const express = require('express');
const https = require('https');
const jsonHandler = require('./jsonHandler'); // Importe o módulo jsonHandler

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

  https.get(githubUrl, async (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        res.json({ dados: jsonData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
      }
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
