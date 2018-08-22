var mysql = require('mysql');
var dbconfig = require('../mysql/DBconfig');
var pool = mysql.createPool(dbconfig.mysql);
var docModel = {};
var responseJSON = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '400',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
docModel.getList = function (req, res, next) {
	pool.getConnection(function (err, connection) {
		// 获取前台页面传过来的参数  
		var sql = 'SELECT * FROM login';
		// 建立连接 增加一个用户信息 
		connection.query(sql, function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '查询成功',
					data: result
				};
			}

			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);

			// 释放连接  
			connection.release();

		});
	});
}
docModel.create = function (req, res, next) {
	pool.getConnection(function (err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		var sql = 'INSERT INTO login(name,password,status) VALUES(?,?,?)';
		// 建立连接 增加一个用户信息 
		connection.query(sql, [param.name, param.password, param.status], function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '增加成功'
				};
			}

			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);

			// 释放连接  
			connection.release();

		});
	});
}
docModel.adduser = function (req, res, next) {
	pool.getConnection(function (err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		var sql = 'INSERT INTO login(name,password,status) VALUES(?,?,?)';
		// 建立连接 增加一个用户信息 
		connection.query(sql, [param.name, param.password, param.status], function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '增加成功'
				};
			}

			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);

			// 释放连接  
			connection.release();

		});
	});
}
docModel.getById = function (req, res, next) {
	pool.getConnection(function (err, connection) {
		// 获取前台页面传过来的参数 

		console.log(req.params.id)
		var sql = 'SELECT * FROM login WHERE id = ? ';
		// 建立连接 增加一个用户信息 
		connection.query(sql, [req.params.id], function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '查询成功',
					data: result
				};
			}

			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);

			// 释放连接  
			connection.release();

		});
	});
}

module.exports = docModel;