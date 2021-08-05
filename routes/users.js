let express = require('express');
let routes =  express.Router();

routes.get('/', (req, res) => { 
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application');
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
routes.get('/admin', (req, res) => { 
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application');
  res.json({
    users:[{
      name:'Erick',
      email:'kleniving@hcide.com.br',
      id: 2
    }]
  });

})

module.exports = routes;