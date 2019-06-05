var express = require('express');
var router = express.Router();
var path = require('path');


var getlist = function(res){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("todo-api");
    dbo.collection("todos").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
          db.close();
    });
  });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


router.get('/data', function(req,res){

  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todo-api");
  dbo.collection("todos").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
        db.close();
  });
});


	// res.json([{"id": 1, "name": "Mymm", "city": "Pantano do Sul"},
  //       {"id": 2, "name": "Skyble", "city": "Guilmaro"},
  //       {"id": 3, "name": "Tagfeed", "city": "Gnosjö"},
  //       {"id": 4, "name": "Realcube", "city": "Jrashen"},
  //       {"id": 5, "name": "Bluejam", "city": "Zhangjiawo"},
  //       {"id": 6, "name": "Jayo", "city": "Obonoma"},
  //       {"id": 7, "name": "Cogidoo", "city": "Sungsang"},
  //       {"id": 8, "name": "Avavee", "city": "Diawara"},
  //       {"id": 9, "name": "Tagtune", "city": "Monywa"},
  //       {"id": 10, "name": "Centimia", "city": "Retkovci"}]);
});

router.delete('/delete/:id', function(req,res){

  console.log(req.params)
  var mongodb = require('mongodb')
var url = "mongodb://localhost:27017/";

mongodb.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todo-api");
  var myquery ={_id: new mongodb.ObjectID(req.params.id)};

  dbo.collection("todos").deleteOne(myquery, function(err, obj) {    if (err) throw err;
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    getlist(res);
  });
});
})


router.post('/postdata', function(req,res){

  var mangodb = require('mongodb');
var url = "mongodb://localhost:27017/";

mangodb.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("todo-api");
  var myobj = { name: req.body.name, address: req.body.address };
  dbo.collection("todos").insertOne(myobj, function(err, resq) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
    getlist(res);

  });
});
})


router.post('/updates/:id', function(req,res){

  console.log(req.params)
  console.log(req.params.data)
  console.log(req.query)
  console.log(req.body)

  var mongodb = require('mongodb');
  var url = "mongodb://localhost:27017/";
  
  mongodb.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("todo-api");
    var query = { _id: new mongodb.ObjectID(req.params.id) };
   // var myquery = { address: "Valley 345" };
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    dbo.collection("todos").updateOne(query, newvalues, function(err, ress) {      if (err) throw err;
      // console.log(result)
res.json(ress)  ;
    db.close();
    });
  });
//   var mangodb = require('mongodb');
// var url = "mongodb://localhost:27017/";
// mangodb.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("todo-api");
//   var myobj = { name: req.body.name, address: req.body.address };
//   dbo.collection("todos").insertOne(myobj, function(err, resq) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//     getlist(res);

//   });
// });
})


router.put('/update/:id', function(req,res){

  console.log(req.params)
  console.log(req.query)
  console.log(req.body)

  var mongodb = require('mongodb');
  var url = "mongodb://localhost:27017/";
  
  mongodb.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("todo-api");
    var query = { _id: new mongodb.ObjectID(req.params.id) };
    dbo.collection("todos").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result)
res.json(result)  ;
    db.close();
    });
  });
//   var mangodb = require('mongodb');
// var url = "mongodb://localhost:27017/";
// mangodb.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("todo-api");
//   var myobj = { name: req.body.name, address: req.body.address };
//   dbo.collection("todos").insertOne(myobj, function(err, resq) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//     getlist(res);

//   });
// });
})
module.exports = router;
