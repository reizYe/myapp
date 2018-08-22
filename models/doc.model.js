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

function connect(res, sql, params) {
	pool.getConnection(function (err, connection) {
		// 获取前台页面传过来的参数  

		// 建立连接 增加一个用户信息 
		connection.query(sql, params, function (err, result) {
			if (result) {
				var resul = {
					code: 200,
					msg: '查询成功',
					data: result
				};
			}
			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, resul);
			// 释放连接  
			connection.release();

		});
	});

}
docModel.getList = function (req, res, next) {
	var sql = 'SELECT * FROM login';
	connect(res, sql);
}
docModel.create = function (req, res, next) {
	var sql = 'INSERT INTO login(name,password,status) VALUES(?,?,?)';
	var param = req.query || req.params;
	var arrparam = [param.name, param.password, param.status];
	if (param) {
		connect(res, sql, arrparam);
	} else {
		connect(res, sql);
	}
}
docModel.adduser = function (req, res, next) {
	var sql = 'INSERT INTO login(name,password,status) VALUES(?,?,?)';
	var param = req.query || req.params;
	var arrparam = [param.name, param.password, param.status];
	if (param) {
		connect(res, sql, arrparam);
	} else {
		connect(res, sql);
	}

}
docModel.getById = function (req, res, next) {
	var sql = 'SELECT * FROM login WHERE id = ? ';

	var arrparam = [req.params.id];
	if (arrparam.length > 0) {
		connect(res, sql, arrparam);
	} else {
		connect(res, sql);
	}

}

module.exports = docModel;