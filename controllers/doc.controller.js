// var docModel = require("../models/doc.model");
var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../mysql/DBconfig');
var userSQL = require('../mysql/sql');
var pool = mysql.createPool(dbconfig.mysql);
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
module.exports = {
    create: function (req, res, next) {
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

    },
    getList: function (req, res, next) {

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
    },
    getById: function (req, res, next) {
        //if (!did) return next(new Error('did not found'));
        // console.log(req.params.did);
        // docModel.findOne({
        //         _id: req.params.did
        //     })
        //     .exec(function (err, docs) {
        //         if (err) return next(err);
        //         if (!docs) return next(new Error('doc not  found'));

        //         return res.json(docs);
        //     });
    }
};