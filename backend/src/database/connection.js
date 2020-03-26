/*
Importar a API Knex
Importar o arquivo de configuração da API, onde está
o path e config do BD
*/ 
const knex = require ('knex');
const configuration = require('../../knexfile');

/*
Dentro do arquivo knexfile por padrão
escolher a configuration development que possui todos dados
da localização do BD e suas migrations,
Atribuimos a variavel connection
*/ 
const connection = knex(configuration.development); 

module.exports = connection;