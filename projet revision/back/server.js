var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var _client = "";

var app = express();

app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  _client = client;
});

function _findUser(username) {
 var db = _client.db('revision');
 db.collection('users').find({}).toArray(function(err, docs){
   return docs.username == username;
 });
};


app.post('/users', function(req, res){
	var body = req.body;
	var db = _client.db('revision');
	if (body.username && body.password) {
		if (_findUser(body.username)) {
	     res.status(409).send('User already exists with username: ' + body.username);
	   	} 
	   	else {
	    	var newUser = {
		       username: body.username,
		       password: body.password,
		       age: body.age,
		       gender: body.gender,
		       firstName: body.firstName,
		       lastName: body.lastName,
		       friends: []
	    	};
		    db.collection('users').save(newUser);

		    res.status(200).send('User created with success :visage_légèrement_souriant: !');
	  	}
	}
	else{
	  res.status(412).send('You should provide all the required fields: username, password');
	}
});


app.get('/users', function(req, res){
	var db = _client.db('revision');
	db.collection('users').find({}).toArray(function(err, docs){
		res.status(200).send(docs);
	})
})

app.get('/users/:id', function(req, res){
	var db = _client.db('revision');
	var id = req.params.id;
	db.collection('users').find({username: id}).toArray(function(err, docs){
		res.status(200).send(docs);
	})
})

app.put('/users/:id', function(req, res){
	var db = _client.db('revision');
	var body = req.body;
	db.collection('users').update({username: body.username},
									{
										username: body.username,
								    	password: body.password,
								      	age: body.age,
								      	gender: body.gender,
								       	firstName: body.firstName,
								       	lastName: body.lastName,
								       	friends: body.friend
									},
									{upsert: true});
	res.status(200).send("profil modifié");
})

app.put('/friends/:idToAdd', function(req, res){
	var db = _client.db('revision');
	var body = req.body;
	var idFriend = req.params.idToAdd;
	db.collection('users').find({username: body.username}).toArray(function(err, docs){
		var friends = docs[0].friends;
		var elem = friends.find(function(element){
			return element == idFriend;
		});
		if(elem){	
			res.send("Déja dans vos amis");
		}
		else{
			friends.push(idFriend);
			db.collection('users').update({username: body.username},
											{
												username: body.username,
										    	password: body.password,
										      	age: body.age,
										      	gender: body.gender,
										       	firstName: body.firstName,
										       	lastName: body.lastName,
										       	friends: friends
											},
											{upsert: true});
			res.status(200).send("ami ajouté");
		}
	})	
})


app.delete('/users/:id', function(req, res){
	var db = _client.db('revision');
	db.collection('users').deleteOne({username: req.params.id}, function(err, docs){
		res.send("user supprimé");
	})
})

app.listen(3000, function() {
  console.log('BACKEND LISTENING ON PORT 3000');
});