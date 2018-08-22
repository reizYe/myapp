var docModel = require("../models/doc.model");

module.exports = {
    create: function (req, res, next) {
        docModel.create(req, res, next);

    },
    adduser: function (req, res, next) {
        docModel.adduser(req, res, next);

    },
    getList: function (req, res, next) {
        docModel.getList(req, res, next);

    },
    getById: function (req, res, next) {
        docModel.getById(req, res, next);

    }
};