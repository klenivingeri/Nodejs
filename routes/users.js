let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.bd',
    autoload:true,
})
module.exports = (app) => {

  let router = app.router('/users');

  router.get((req, res) => { 
  
    db.find({}).sort({name:-1}).exec((err, users) =>{
    //find: passamos quem queremos buscar, sort:a forma que é listado.
      if (err){
       app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          users
        });
      }
      
    })

  }) // GET


  router.post((req, res) => { 
    
    db.insert(req.body, (err, user) =>{
      if (err){
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }

    });
  
  }); // POST
};