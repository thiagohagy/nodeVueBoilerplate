const express = require('express');
const rotas = express.Router();

const controller = require('./controller');


// UPLOAD
const multer = require('multer');
const config = require('../../config');
const upload = multer({ dest: `${config.uploadPath}/temp`}); // multer dont let you change dest "on the fly"

rotas.post('/', upload.single('file'), controller.upload); // single file upload

rotas.get('/', controller.getFile);

module.exports = rotas;
