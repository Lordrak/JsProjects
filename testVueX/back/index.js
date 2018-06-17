var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var users= [];

app.post("/signup", function(req,res){
	users.push(req.body);
	res.send(users);
});

app.post("/login", function(req,res){
	var user = req.body;
	var userFind = users.find(function(element){
		return user.username == element.username;
	});

	if(userFind){
		res.send(userFind);
	}
	else{
		res.send({username: "nope"});
	}
});



app.listen(8000, function(err){
	console.log("tu es co");
})