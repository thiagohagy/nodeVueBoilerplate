// /* Model*/
// var Model = require('./model');
// const config = require('../../config');
// const fs = require('fs');
// const path = require('path');
// const to = require('../../core/to');

exports.upload = (req, res) => {
  console.log(req);
  res.end();
};

// exports.getImage = (req, res) => {
//   res.setHeader('Content-Type', req.query.mimetype);
//   const pathImg = path.join(config.uploadPath, req.params.hash);
//   const exist = fs.existsSync(pathImg);
//   if (exist) {
//     fs.createReadStream(pathImg).pipe(res);
//   } else {
//     res.end();
//   }
// };
