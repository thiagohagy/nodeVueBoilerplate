/* Model*/
var Model = require('./model');
const to = require('../../core/to');

exports.index = async (req, res) => {
  const filtro = {};
  const [err, data] = await to(
    Model.find(filtro)
      .skip(req.body.skip || 0)
      .limit(req.body.limit || 50)
  );

  const total = await Model.find(filtro).count();

  res.json({ total, data });
};

exports.get = async (req, res) => {
  const data = await Model.findOne({ _id: req.params.id });
  res.json(data);
};

exports.all = async (req, res) => {
  const data = await Model.find({});
  res.json(data);
};

exports.delete = async (req, res) => {
  const data = await Model.remove({ _id: req.params.id });
  res.json(data);
};

exports.new = async (req, res) => {
  console.log(req.body);
  const model = new Model(req.body);
  const [err, data] = await to(model.save());
  if (!err) {
    res.json({ success: true, form: req.body });
  } else {
    res.json({ succsess: false, data, err, form: req.body });
  }
};

exports.edit = async (req, res) => {
  const [err, data] = await to(Model.update({ _id: req.body._id }, req.body));

  if (!err && data) {
    res.json({ success: true, data, err, form: req.body });
  } else {
    res.json({ success: false, data, err, form: req.body });
  }
};
