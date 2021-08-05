const express = require('express');
let routesIndex = require('./routes/index');
let routesUsers = require('./routes/users');

const app = express();

app.use(routesIndex);
app.use('/users',routesUsers);

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})
















/**
 *  1 ) Carrega o modulo http.
 *  2 ) Oque ela pode pedir(requisições), e oque ela pode receber (Respostas).
 */