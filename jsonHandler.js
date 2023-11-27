const fs = require('fs');

function lerArquivoJson(caminho) {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return JSON.parse(conteudo);
  } catch (error) {
    console.error(`Erro ao ler o arquivo JSON em ${caminho}: ${error.message}`);
    throw error; // Rejeita o erro para que quem chamou possa lidar com ele
  }
}

function consultarJson(caminho, chave) {
  try {
    const conteudo = lerArquivoJson(caminho);
    return conteudo[chave];
  } catch (error) {
    console.error(`Erro ao consultar o JSON em ${caminho} para a chave ${chave}: ${error.message}`);
    throw error; // Rejeita o erro para que quem chamou possa lidar com ele
  }
}

module.exports = {
  lerArquivoJson,
  consultarJson,
};
