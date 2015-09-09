var express = require('express'),
	api = require('./routes/api'),
	bodyParser = require('body-parser'),
	mysql = require('./helper/mysql');

var app = express();

mysql.createConnectionPool();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', api);

/**Middleware* */
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.get('/', function(req,res){
	res.render('index');
});

app.listen(3000, function() {
	console.log("Server Started ... ");
});