Descrição do Projeto: Consumo de Dados de Carros

Este projeto consiste em uma aplicação Node.js utilizando o framework Express para criar uma API simples. A principal funcionalidade da API é consumir dados de carros de um arquivo JSON hospedado no GitHub (https://github.com/matthlavacka/car-list) e disponibilizar informações relevantes através de diferentes rotas.

Principais Funcionalidades:

Listagem Geral: A rota principal ("/") retorna o JSON completo com informações sobre diversas marcas e modelos de carros.
Marcas com Mais Modelos/Menos Modelos: Rotas específicas ("/marcas/maisModelos" e "/marcas/menosModelos") retornam as marcas que possuem o maior e o menor número de modelos, respectivamente.
Top X Marcas com Mais/Menos Modelos: Rotas adicionais ("/marcas/listaMaisModelos/:x" e "/marcas/listaMenosModelos/:x") permitem a busca das marcas com mais e menos modelos, onde ":x" é um parâmetro definido pelo usuário.
Buscar Modelos por Marca (POST): A rota ("/marcas/listaModelos") permite a busca de modelos de uma marca específica através de uma requisição POST, utilizando um formulário HTML para fornecer o nome da marca.
O projeto visa demonstrar boas práticas de organização de código, consumo de APIs externas e manipulação de dados JSON. As operações de consumo do arquivo JSON são centralizadas em funções de lógica de negócios para garantir clareza e modularidade.

Descrição Técnica do Projeto: Consumo de Dados de Carros

Este projeto utiliza as seguintes tecnologias e ferramentas:

Node.js: Ambiente de execução JavaScript do lado do servidor, utilizado para construir a aplicação.

Express: Framework web para Node.js que simplifica a criação de APIs, gerenciamento de rotas e requisições HTTP.

Body-parser: Middleware para o Express que facilita o processamento de dados presentes no corpo das requisições, especialmente útil para lidar com dados JSON.

HTTP/HTTPS: Módulo nativo do Node.js utilizado para realizar requisições HTTP/HTTPS, permitindo o consumo de dados externos.

Para instalar as dependências do projeto, siga estas instruções:

Node.js e npm: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em https://nodejs.org/, que inclui o npm (gerenciador de pacotes do Node.js).

Clone o Repositório: Faça o clone deste repositório em sua máquina local.

bash
Copy code
git clone https://github.com/luanleecf/nodejsxpeducacao.git
Instale as Dependências: Navegue até o diretório do projeto e execute o seguinte comando para instalar as dependências.

bash
Copy code
npm install
Inicie o Servidor: Após a conclusão da instalação, inicie o servidor local com o seguinte comando:

bash
Copy code
npm start
O servidor será iniciado e estará disponível em http://localhost:3000/.
