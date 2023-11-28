const express = require('express');
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
          const marcasComMaisModelos = encontrarMarcasComMaisModelos(dadosJson);
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
          const marcasComMenosModelos = encontrarMarcasComMenosModelos(dadosJson);
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
          const xMarcasComMaisModelos = encontrarXMarcasComMaisModelos(dadosJson, x);
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
          const xMarcasComMenosModelos = encontrarXMarcasComMenosModelos(dadosJson, x);
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
    const modelosDaMarca = encontrarModelosDaMarca(dadosJson, nomeMarca);
    res.json({ modelosDaMarca });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//FUNÇÕES///

// Função para encontrar as marcas com mais modelos
function encontrarMarcasComMaisModelos(jsonData) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    let maxModelos = 0;
    let marcasComMaisModelos = [];

    jsonData.forEach((marca) => {
      if (marca.models.length > maxModelos) {
        maxModelos = marca.models.length;
        marcasComMaisModelos = [marca.brand];
      } else if (marca.models.length === maxModelos) {
        marcasComMaisModelos.push(marca.brand);
      }
    });

    if (marcasComMaisModelos.length === 1) {
      return marcasComMaisModelos[0];
    }

    return marcasComMaisModelos;
  } catch (error) {
    console.error(`Erro ao encontrar as marcas com mais modelos: ${error.message}`);
    throw error;
  }
}

// Função para encontrar as marcas com menos modelos
function encontrarMarcasComMenosModelos(jsonData) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    let minModelos = Infinity;
    let marcasComMenosModelos = [];

    jsonData.forEach((marca) => {
      if (marca.models.length < minModelos) {
        minModelos = marca.models.length;
        marcasComMenosModelos = [marca.brand];
      } else if (marca.models.length === minModelos) {
        marcasComMenosModelos.push(marca.brand);
      }
    });

    if (marcasComMenosModelos.length === 1) {
      return marcasComMenosModelos[0];
    }

    return marcasComMenosModelos;
  } catch (error) {
    console.error(`Erro ao encontrar as marcas com menos modelos: ${error.message}`);
    throw error;
  }
}


// Função para encontrar as X marcas com mais modelos
function encontrarXMarcasComMaisModelos(jsonData, x) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    const marcasOrdenadas = jsonData.sort((a, b) => b.models.length - a.models.length);

    const xMarcas = marcasOrdenadas.slice(0, x);

    const resultados = xMarcas.map((marca) => `${marca.brand} - ${marca.models.length}`);

    return resultados;
  } catch (error) {
    console.error(`Erro ao encontrar as X marcas com mais modelos: ${error.message}`);
    throw error;
  }
}

// Função para encontrar as X marcas com menos modelos
function encontrarXMarcasComMenosModelos(jsonData, x) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    // Ordena as marcas com base no número de modelos em ordem crescente
    // Em caso de empate, utiliza a ordem alfabética do nome da marca como critério de desempate
    const marcasOrdenadas = jsonData.sort((a, b) => {
      if (a.models.length !== b.models.length) {
        return a.models.length - b.models.length;
      }
      return a.brand.localeCompare(b.brand);
    });

    const xMarcas = marcasOrdenadas.slice(0, x);

    const resultados = xMarcas.map((marca) => `${marca.brand} - ${marca.models.length}`);

    return resultados;
  } catch (error) {
    console.error(`Erro ao encontrar as X marcas com menos modelos: ${error.message}`);
    throw error;
  }
}

// Função para encontrar os modelos de uma marca
function encontrarModelosDaMarca(jsonData, nomeMarca) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    const marcaEncontrada = jsonData.find((marca) => marca.brand.toLowerCase() === nomeMarca.toLowerCase());

    if (!marcaEncontrada) {
      return [];
    }

    return marcaEncontrada.models;
  } catch (error) {
    console.error(`Erro ao encontrar os modelos da marca: ${error.message}`);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
