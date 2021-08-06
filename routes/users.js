let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.bd',
    autoload:true,
})
module.exports = (app) => {

  let router = app.route('/users');

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

  let routerId = app.route('/users/:id');

  routerId.get((req, res) => {

    db.findOne({_id:req.params.id}).exec((err, user) =>{
      if(err){
        app.utils.error.send(err, req, res);
      } else{
         res.status(200).json(user);
      }
    });

  });

  routerId.put((req, res) =>{

    db.update({_id:req.params.id}, req.body, err =>{
      if (err){
        app.utils.error.send(err, req, res);
      } else{
        res.status(200).json(Object.assign(req.params, req.body));
      }
    })
  })

  routerId.delete((req, res)=>{

    db.remove({_id: req.params.id}, {}, err =>{
      if(err){
        app.utils.error.send(err, req, res);
      }else{
        res.status(200).json(req.params)
      }
    })

  })
};