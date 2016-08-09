
var express = require('express');
var bodyParse = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
var animalSchema = mongoose.Schema({animal:String});
var animals = mongoose.model('animals',animalSchema);

var app = express();
app.route('/:id').get(function(req,res)
	{
		var id = req.params.id ;
		animals.find(function(err,ani)
             {
             	if(err)res.send(err);
             	res.json(ani);
             }
			);
	}
	);

app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.listen(3000,function () {
	console.log('listeningon port 3000');
});
