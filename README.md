# NodeJS - JavaScript no Back-End (No Lado do Servidor)
 - Precisa do nodejs instalado na maquina.
 
## Iniciando servidor
`node index` - Depois de criar o arquivo index.js.
~~~Javascript
//index.js
const http = require('http'); // 1 Carrega o modulo http

http.createServer((req, res) => { // 2 Oque ela pode pedir(requisições), e oque ela pode receber (Respostas).
  console.log('URL:', req.url); 
  // retorna barra /
  console.log('Method:', req.method); 
  // retorna por padrão o method GET

  res.end('OK') // responde a requisição.
  // Se não houver retorno da requisição, vai ficar aguardando infinitamente.

})

server.listen(3000, '127.0.0.1', () => { 
// a porta que voce quer subir 3000, e o IP.

  console.log('Servidor rodando')
  
})

~~~

## Identificando camadas
 Coloquei o Switch mas pode ser qualquer outro condicional para identificar as rotas.
~~~Javascript

const http = require('http');

let server = http.createServer((req, res) => { 

  console.log('URL:', req.url);
  console.log('Method:', req.method);

  switch (req.url) { // Passamos um retorno dependendo da rota chamada
    case '/':
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Olá </h1>');
      break;

      case '/users':
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        users:[{
          name:'Hcode',
          email:'contato@hcide.com.br',
          id: 1
        },{
          name:'Erick',
          email:'kleniving@hcide.com.br',
          id: 2
        }]
      }));
      break;
  
    default:
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1> Não é uma rota esperada</h1>');
      break;
  }

})

server.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})

// http://localhost:3000/
// Olá
// http://localhost:3000/users
// JSON
// http://localhost:3000/rotaNaoEsperada
// Não é uma rota esperada
~~~

## Iniciando Package.json
 - `npm init` - Inicia o package.json. 
Ele contem todas as informações necessarias para o projeto rodar.
 - `npm install express --save` -  Instala o express como dependencia do projeto --save.
 - `npm install nodemon -g` - Instala o nodemon apenas na sua maquina -g,
 executamos o servidor com `nodemon index`.

## Criando servidor com Express.
Itilizamos o pacote para ajudar na criação do servidor.

~~~Javascript
const express = require('express');
const app = express()

app.get('/', (req, res) => { 

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Olá </h1>');

})

app.get('/users', (req, res) => { 
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({
    users:[{
      name:'Hcode',
      email:'contato@hcide.com.br',
      id: 1
    },{
      name:'Erick',
      email:'kleniving@hcide.com.br',
      id: 2
    }]
  });

})

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})


~~~

## Dividindo rotas em arquivos
Não é uma boa pratica, deixar todo o codigo em apenas um arquivo, dessa forma vamos conseguir acessar os arquivos individualmente.

 - Criar uma nova pasta /routes com o arquivo index e users


~~~Javascript 
 // routes/index
const express = require('express');
let routes = express.Router();

routes.get('/', (req, res) => { 

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Olá </h1>');

})

module.exports = routes;

~~~
~~~Javascript 
 // routes/users
let express = require('express');
let routes =  express.Router();

routes.get('/users', (req, res) => { 
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({
    users:[{
      name:'Hcode',
      email:'contato@hcide.com.br',
      id: 1
    },{
      name:'Erick',
      email:'kleniving@hcide.com.br',
      id: 2
    }]
  });

})

module.exports = routes;

~~~

~~~javascript 
// raiz index

const express = require('express');
let routesIndex = require('./routes/index');
let routesUsers = require('./routes/users');

const app = express();

app.use(routesIndex);
app.use(routesUsers);

app.listen(3000, '127.0.0.1', () => {

  console.log('Servidor rodando')

})

~~~

## Consign
`npm install consign --save` - Instala o consign como dependencia do projeto --save.
Ajuda a fazer o gerenciamento das rotas.

~~~javascript 
// raiz index
const express = require('express');
const consign = require('consign');

const app = express();
consign().include('routes').into(app);
//Consign vai incluir a pasta routes dentro do nosso app
//Ele passar o app dentro do modules exportados nas rotas

  app.listen(3000, '127.0.0.1', () => {
    console.log('Servidor rodando')
  });
  
~~~

~~~Javascript 
 // routes/index

module.exports = (app) =>{

  app.get('/', (req, res) => { 

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá </h1>');
  
  })

}

module.exports = routes;

~~~
~~~Javascript 
 // routes/users

module.exports = (app) => {
  app.get('/users', (req, res) => { 
  
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json({
      users:[{
        name:'Hcode',
        email:'contato@hcide.com.br',
        id: 1
      },{
        name:'Erick',
        email:'kleniving@hcide.com.br',
        id: 2
      }]
    });
  
  })
  app.post('/users', (req, res) => { 
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.json({
      users:[{
        name:'Erick',
        email:'kleniving@hcide.com.br',
        id: 2
      }]
    });
  
  })
};

module.exports = routes;

~~~


## Post
Body-parser 
`npm install body-parser --save` - Auxilia na forma de receber os dados.

~~~Javascript
// raiz index
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

~~~

~~~Javascript
// raiz Routes/users
 app.post('/users', (req, res) => { 
    
    res.json(req.body);
  
  })

~~~

## Banco de Dados
`npm install nedb --save` é um banco de dados em js
~~~Javascript
// routes/users
let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.bd',
    autoload:true,
})
module.exports = (app) => {
  
  app.get('/users', (req, res) => { // Chamada da rota via GET padrão
  
    db.find({}).sort({name:-1}).exec((err, users) =>{  // retonar os dados do banco
      if (err){
        console.log(`Error: ${err}`);
        res.status(400).json({
          error: err
        })
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
      
    })

  }) // GET


  app.post('/users', (req, res) => { // Chamada da rota via post
      
    db.insert(req.body, (err, user) =>{ //inserindo os dados no bd
      if (err){
        console.log(`Error: ${err}`);
        res.status(400).json({
          error: err
        })
      } else {
        res.status(200).json(user);
      }

    });
  
  }); // POST
};
~~~