var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var animals = [
{
	name: "chien"
},
{
	name : "chat"
},
{
	name : "oiseau"
}];

app.get('/getAnimals', function(req,res){
	res.status(200).send(animals);
})

app.post('/addAnimal', function(req,res){
	var animal = req.body;
	var trouve = animals.find(function(element){
		return animal.name == element.name;
	});
	if(trouve){
		res.status(200).send("Animal deja dans la liste");
	}else{
		animals.push(animal);
		res.status(200).send("Animal rajouté");		
	}

})

app.put('/description/:name', function(req, res){
	var body = req.body;
})

app.listen(3000, function(err){
	if(err)console.log(err);
	console.log("Connecting on port 3000");
})