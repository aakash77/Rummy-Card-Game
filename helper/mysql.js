var mysql = require('mysql'), config = require('./config');
var db = config.db,
	poolConfig = config.dbPool,
	pool = [];

var conn;
/**
 * Method to create database
 */
function createConnection(){
	return mysql.createConnection({
		host : db.host,
		port : db.port,
		user : db.user,
		password : db.password,
		database : db.database,
		multipleStatements: true
	});
}

/**
 * Creating Connection Pool
 */
exports.createConnectionPool =function (){
	for(var i =0;i<poolConfig.maxSize;i++){
		pool.push(createConnection());
	}
};


/**
 * Function to get connection from pool
 * @returns connection
 */
function getConnectionFromPool(){
	if(pool.length<=0){
		console.log("Empty Pool");
		return null;
	}else{
		return pool.pop();
	}
}

/*
 * Function to query database
*/
exports.query  = function(queryString, params, callback){
	var selectIndex = queryString.toUpperCase().indexOf("SELECT");
	var connection = getConnectionFromPool();
	if(connection){
		if (arguments.length == 3) {
			var sql = mysql.format(queryString, params);
			/*console.log(sql);*/
			connection.query(sql, function(err, rows, field) {
				if (err) {
					console.log(err);
					callback(err);
				} else {
					callback(null, rows);
				}
				pool.push(connection);
			});
		} else {
			callback = params;
			connection.query(queryString, function(err, rows, field) {
				if (err) {
					console.log(err);
					callback(err);
				} else {
					callback(null, rows);
				}
				pool.push(connection);
			});
		}
	}else{
		console.log("No connection found");
	}
};