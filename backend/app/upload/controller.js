const config = require('../../config');
const fs = require('fs');
const path = require('path');
const to = require('../../core/to');

exports.upload = (req, res) => {

  // after the file is uploaded i'll move it to the destination path provided by the frontend
  // files stays in 'temp' folder if has not a req.body.folder
  if(req.body.folder && req.file ) {
    // check if folder exists and create it if needed
    let destFolder = `${config.uploadPath}/${req.body.folder}`;
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder);

    // move file to folder
    fs.rename(req.file.path, `${destFolder}/${req.file.filename}`);
  }

  res.json({
    file: {
      size: req.file.size,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      encoding: req.file.encoding,
      destinationFolder: req.body.folder || 'temp'
    }
  });
};

exports.getFile = async (req, res) => {
  res.setHeader('Content-Type', req.query.mimetype);

  const pathImg = path.join(`${config.uploadPath}/${req.query.folder}`, req.query.filename);
  const exist = await fs.existsSync(pathImg);

  if (exist) {
    fs.createReadStream(pathImg).pipe(res);
  } else {
    res.end();
  }
};
