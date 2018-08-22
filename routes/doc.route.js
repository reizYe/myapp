var express = require('express');
var docRouter = express.Router();
var docController = require('../controllers/doc.controller');

docRouter.get('/getList', docController.getList);
docRouter.post('/adduser', docController.adduser);
docRouter.get('/create', docController.create);
docRouter.get('/getById/:id', docController.getById);
module.exports = docRouter;