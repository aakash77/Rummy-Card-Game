var express = require('express'),
	mysql = require('../helper/mysql');

var api = express.Router();

//Get Data
api.get('/data',function(req,res){
	mysql.query("SELECT * FROM ?? ORDER BY ?? DESC LIMIT 1",["dump","id"],function(err,result){
		if(err){
			res.status(501).json({msg:"Error while fetching data"});
		}else{
			res.status(200).json({data:result});
		}
	});
});

//Add Data
api.post('/data',function(req,res){

	var params = {
		data : req.body.payload,
		timestamp : req.body.timestamp
	};

	mysql.query("INSERT INTO ?? SET ?",["dump",params],function(err,result){
		if(err){
			res.status(501).json({msg:"Error while saving data"});
		}else{
			res.status(200).json({msg:"Successful"});
		}
	});
});

//Delete All Data
api.delete('/data',function(req,res){

	mysql.query("DELETE FROM ??",["dump"],function(err,result){
		if(err){
			res.status(501).json({msg:"Error while fetching data"});
		}else{
			res.status(200).json({msg:"Successful"});
		}
	});
});

module.exports = (function() {
	return api;
})();