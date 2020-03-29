const express =  require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();


app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(routes);


app.listen(3333);





/*

Rota / Recurso


Metodos HTTP:

GET: Buscar/listar informação do backend
POST: Criar informação no backend
PUT: Alterar informação no backend
DELETE: Deletar informação do backend


*/ 

/* 
Tipos de Parâmetros:

*Query:Parametros nomeados enviados na rota apos o simbolo de "?""
    geralmente servem para filtros, paginação

*Route Params:Parametros utilizados para indetificar recursos

*Request Body: Corpo da requisição, utilizado para criar e alterar recursos

*/

/*
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server, etc....
NoSQL: MongoDB, CouchDB, etc
*/ 

/*

Driver: SELECT * FROM users
Query Builder: table('users').select('*').where('*')

*/