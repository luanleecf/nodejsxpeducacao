const express = require('express');
const marcasController = require('./controllers/marcasController');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('getFullDados', (req, res) => {
  try {
    const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

    https.get(githubUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const dadosJson = JSON.parse(data);
          res.json({ dadosJson });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao ler o arquivo JSON do GitHub' });
  }
});

// Nova rota para encontrar a marca com mais modelos
app.get('/marcas/maisModelos', (req, res) => {
  try {
    const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

    https.get(githubUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const dadosJson = JSON.parse(data);
          const marcasComMaisModelos = marcasController.encontrarMarcasComMaisModelos(dadosJson);
          res.json({ marcasComMaisModelos });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao ler o arquivo JSON do GitHub' });
  }
});

// Nova rota para encontrar a marca com menos modelos
app.get('/marcas/menosModelos', (req, res) => {
  try {
    const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

    https.get(githubUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const dadosJson = JSON.parse(data);
          const marcasComMenosModelos = marcasController.encontrarMarcasComMenosModelos(dadosJson);
          res.json({ marcasComMenosModelos });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao ler o arquivo JSON do GitHub' });
  }
});

// Nova rota para encontrar as X marcas com mais modelos
app.get('/marcas/listaMaisModelos/:x', (req, res) => {
  try {
    const x = parseInt(req.params.x, 10); // Obtém o parâmetro X da URL e converte para número
    if (isNaN(x) || x <= 0) {
      throw new Error('O parâmetro X deve ser um número inteiro positivo.');
    }

    const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

    https.get(githubUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const dadosJson = JSON.parse(data);
          const xMarcasComMaisModelos = marcasController.encontrarXMarcasComMaisModelos(dadosJson, x);
          res.json({ xMarcasComMaisModelos });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Nova rota para encontrar as X marcas com menos modelos
app.get('/marcas/listaModelos/:x', (req, res) => {
  try {
    const x = parseInt(req.params.x, 10);
    if (isNaN(x) || x <= 0) {
      throw new Error('O parâmetro X deve ser um número inteiro positivo.');
    }

    const githubUrl = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

    https.get(githubUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const dadosJson = JSON.parse(data);
          const xMarcasComMenosModelos = marcasController.encontrarXMarcasComMenosModelos(dadosJson, x);
          res.json({ xMarcasComMenosModelos });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao processar JSON do GitHub' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consumir JSON do GitHub' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Nova rota para encontrar os modelos de uma marca a partir de uma requisição POST
app.post('/marcas/listaModelos', (req, res) => {
  try {
    const nomeMarca = req.body.nomeMarca;
    if (!nomeMarca) {
      throw new Error('O parâmetro nomeMarca não foi fornecido.');
    }
    const dadosJson = req.body.dadosJson;
    if (!dadosJson) {
      throw new Error('Os dados do JSON não foram fornecidos.');
    }
    const modelosDaMarca = marcasController.encontrarModelosDaMarca(dadosJson, nomeMarca);
    res.json({ modelosDaMarca });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
