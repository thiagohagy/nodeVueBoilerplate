/* Model*/
var Model = require('../sms/model');
var Campanha = require('../campanhas/model');
const to = require('../../core/to');
const moment = require('moment');
const axios = require('axios');

const headers = {
  username: 'Best Use',
  authenticationtoken: 'HmDEZrLxxn8tVHxXgVW7BfCv49c19fgwWLqhrVYS',
  'content-type': 'application/json'
};

const movileUrl = 'https://api-messaging.movile.com/v1/send-sms';

exports.index = async (req, res) => {
  const filtro = {};
  filtro.$and = [];

  let dataInicio;
  let dataFim;

  if (req.body.dataInicial) {
    dataInicio = moment(req.body.dataInicial)
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
  } else {
    dataInicio = moment()
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
  }

  if (req.body.dataFinal) {
    dataFim = moment(req.body.dataFinal)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
  } else {
    dataFim = moment(dataInicio)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
  }

  filtro.$and.push({ data: { $gte: dataInicio } });
  filtro.$and.push({ data: { $lte: dataFim } });

  filtro.envioAvulso = true;

  if (req.body.cliente && req.body.cliente != '') {
    filtro.cliente = req.body.cliente;
  }

  const [err, data] = await to(
    Model.find(filtro)
      .deepPopulate('cliente createdBy lastUpdateBy')
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
  if (typeof req.body.cliente === 'object') {
    req.body.cliente = req.body.cliente._id;
    if (req.body.numero) {
      req.body.numero = req.body.numero.replace(/\D/g, '');
    }

    req.body.createdBy = req.decoded._id;

    const data = moment().startOf('day');

    const campanha = await Campanha.find({
      data: data,
      cliente: req.body.cliente
    }).limit(1);

    if (campanha.length > 0) {
      req.body.campanha = campanha[0]._id;
    } else {
      const form = {};
      form.nome = 'avulso';
      form.data = data;
      form.envioAvulso = true;
      form.cliente = req.body.cliente;
      form.createdBy = req.decoded._id;
      const novaCampanha = new Campanha(form);

      const saveNovaCampanha = await novaCampanha.save();
      req.body.campanha = saveNovaCampanha._id;
    }

    axios
      .post(
        movileUrl,
        { destination: `55${req.body.numero}`, messageText: req.body.mensagem },
        {
          headers
        }
      )
      .then(async response => {
        if (response && response.data && response.data.id) {
          console.log(
            'Mensagem enviada com sucesso cliente: ',
            req.body.cliente
          );

          const model = new Model(req.body);
          const [err, dataSave] = await to(model.save());
          if (!err && dataSave) {
            res.json({
              success: true,
              data: dataSave,
              err: err,
              form: req.body,
              response: response.body
            });
          } else {
            res.json({
              success: false,
              data: dataSave,
              err: 'Nao foi possivel salvar sms',
              form: req.body
            });
          }
        } else {
          res.json({
            success: false,
            err: 'Nao foi possivel enviar para Movile',
            form: req.body
          });
        }
      });
  } else {
    res.json({
      success: false,
      err: 'Ocorreu um erro, Cliente inválido!',
      form: req.body
    });
  }
};

exports.edit = async (req, res) => {
  req.body.lastUpdateBy = req.decoded._id;
  const [err, data] = await to(Model.update({ _id: req.body._id }, req.body));

  if (!err && data) {
    res.json({ success: true, data, err, form: req.body });
  } else {
    res.json({ success: false, data, err, form: req.body });
  }
};
