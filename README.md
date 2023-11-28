Descrição do Projeto: Consumo de Dados de Carros

Este projeto consiste em uma aplicação Node.js utilizando o framework Express para criar uma API simples. A principal funcionalidade da API é consumir dados de carros de um arquivo JSON hospedado no GitHub (https://github.com/matthlavacka/car-list) e disponibilizar informações relevantes através de diferentes rotas.

Principais Funcionalidades:

Listagem Geral: A rota principal ("/") retorna o JSON completo com informações sobre diversas marcas e modelos de carros.
Marcas com Mais Modelos/Menos Modelos: Rotas específicas ("/marcas/maisModelos" e "/marcas/menosModelos") retornam as marcas que possuem o maior e o menor número de modelos, respectivamente.
Top X Marcas com Mais/Menos Modelos: Rotas adicionais ("/marcas/listaMaisModelos/:x" e "/marcas/listaMenosModelos/:x") permitem a busca das marcas com mais e menos modelos, onde ":x" é um parâmetro definido pelo usuário.
Buscar Modelos por Marca (POST): A rota ("/marcas/listaModelos") permite a busca de modelos de uma marca específica através de uma requisição POST, utilizando um formulário HTML para fornecer o nome da marca.
O projeto visa demonstrar boas práticas de organização de código, consumo de APIs externas e manipulação de dados JSON. As operações de consumo do arquivo JSON são centralizadas em funções de lógica de negócios para garantir clareza e modularidade.
