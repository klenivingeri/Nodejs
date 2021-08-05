
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
  app.get('/users/admin', (req, res) => { 
    
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