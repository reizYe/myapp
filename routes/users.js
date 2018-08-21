var express = require('express');
var router = express.Router();
var URL = require('url');

var mysql = require('mysql');
var dbconfig = require('../mysql/DBconfig');
var userSQL = require('../mysql/sql');
var pool = mysql.createPool(dbconfig.mysql);
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'reizye'
  });


});
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
// 添加用户
router.get('/addUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.name, param.password, param.status], function (err, result) {
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
});

// 查询用户
router.get('/getUserlist', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  

    // 建立连接 增加一个用户信息 
    connection.query(userSQL.queryAll, function (err, result) {
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
});


module.exports = router;