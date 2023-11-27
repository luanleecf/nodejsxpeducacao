const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.get('', (req, res) => {
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
app.get('/marca-com-mais-modelos', (req, res) => {
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
          const marcaComMaisModelos = encontrarMarcaComMaisModelos(dadosJson);
          res.json({ marcaComMaisModelos });
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

// Função para encontrar a marca com mais modelos
function encontrarMarcaComMaisModelos(jsonData) {
  try {
    let marcaMaisModelos = '';
    let maxModelos = 0;

    jsonData.forEach((marca) => {
      if (marca.models.length > maxModelos) {
        maxModelos = marca.models.length;
        marcaMaisModelos = marca.brand;
      }
    });

    return marcaMaisModelos;
  } catch (error) {
    console.error(`Erro ao encontrar a marca com mais modelos: ${error.message}`);
    throw error;
  }
}

// Nova rota para encontrar a marca com menos modelos
app.get('/marca-com-menos-modelos', (req, res) => {
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
          const marcaComMenosModelos = encontrarMarcaComMenosModelos(dadosJson);
          res.json({ marcaComMenosModelos });
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
app.get('/x-marcas-com-mais-modelos/:x', (req, res) => {
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
app.get('/x-marcas-com-menos-modelos/:x', (req, res) => {
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




// Função para encontrar a marca com menos modelos
function encontrarMarcaComMenosModelos(jsonData) {
  try {
    if (jsonData.length === 0) {
      throw new Error('O JSON não contém dados de marcas e modelos.');
    }

    let marcaMenosModelos = jsonData[0].brand;
    let minModelos = jsonData[0].models.length;

    jsonData.forEach((marca) => {
      if (marca.models.length < minModelos) {
        minModelos = marca.models.length;
        marcaMenosModelos = marca.brand;
      }
    });

    return marcaMenosModelos;
  } catch (error) {
    console.error(`Erro ao encontrar a marca com menos modelos: ${error.message}`);
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

    // Pega as primeiras X marcas
    const xMarcas = marcasOrdenadas.slice(0, x);

    // Cria o array de resultados
    const resultados = xMarcas.map((marca) => `${marca.brand} - ${marca.models.length}`);

    return resultados;
  } catch (error) {
    console.error(`Erro ao encontrar as X marcas com menos modelos: ${error.message}`);
    throw error;
  }
}




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
