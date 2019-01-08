const express = require('express');
const rotas = express.Router();

const controller = require('./controller');

// UPLOAD
const multer = require('multer');
const config = require('../../config');
// rotas.get('/image/:hash', controller.getImage);
// const upload = multer({ dest: `${config.rootPath}/uploads`});

// rotas.post('/', multer({
//     dest: `${config.rootPath}/uploads`,
//     changeDest: (dest, req, res) => {
//         console.log(dest);
//         console.log(req);
//     }
// }), controller.upload);

rotas.post('/', multer({
    dest: `${config.rootPath}/uploads`
}), controller.upload)


module.exports = rotas;
