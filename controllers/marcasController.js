const https = require('https');

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

module.exports = {
    encontrarMarcasComMaisModelos,
    encontrarMarcasComMenosModelos,
    encontrarXMarcasComMaisModelos,
    encontrarXMarcasComMenosModelos,
    encontrarModelosDaMarca
};