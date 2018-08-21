/**
 * Created by jun on 2016/4/23.
 * 用户模型
 */
var mysql = require('mysql');
var dbconfig = require("../mysql/DBconfig");

//使用连接池
var pool = mysql.createPool(dbconfig.mysql);

module.exports = {
    showUser: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            //定义查询语句
            var sql = "SELECT * FROM login";
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
            })
        });
    },
    test: function () {
        return "hello world from test";
    }
}
