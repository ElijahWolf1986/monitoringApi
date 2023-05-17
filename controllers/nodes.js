const Node = require('../models/node');
const NotFoundError = require('../errors/NotFoundError.js');
const BadRequestError = require('../errors/BadRequestError.js');

const getAllNodes = async (req, res, next) => {
  try {
    const nodes = await Node.find({});
    if (!nodes || nodes.length === 0) {
      return next(new NotFoundError('Не удалось найти ни одного узла'));
    }
    return res.status(200).send({ data: nodes });
  } catch (err) {
    return next(
      new BadRequestError('Не удалось загрузить узлы, попробуйте позже')
    );
  }
};

const createNode = async (req, res, next) => {
  const {
    name,
    ip,
    type,
    vendor,
    snmpKey,
    port,
    clientId,
    parameters,
    alarms,
  } = req.body;

  try {
    await Node.create({
      name,
      ip,
      type,
      vendor,
      snmpKey,
      port,
      clientId,
      parameters,
      alarms,
    });
    return res.status(200).send({
      name,
      ip,
      type,
      vendor,
      snmpKey,
      port,
      clientId,
      parameters,
      alarms,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(
        new BadRequestError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`
        )
      );
    }
    return next(
      new BadRequestError('Не удалось создать узел, попробуйте позже')
    );
  }
};

const editNode = async (req, res, next) => {
  const { ip, parameters, alarms } = req.body;
  try {
    await Node.find({ ip: ip }).update({
      parameters,
      alarms,
    });
    return res.status(200).send({ ip, parameters, alarms });
  } catch (err) {
    return next(
      new BadRequestError(
        err,
        'Не удалось обновить параметры узла, попробуйте позже'
      )
    );
  }
};

const deleteNode = async (req, res, next) => {
  const { ip } = req.body;

  try {
    const deletedNode = await Node.find({ ip: ip }).remove();
    return res.status(200).send(deletedNode);
  } catch (err) {
    return next(
      new BadRequestError('Не удалось удалить узел, попробуйте позже')
    );
  }
};

module.exports = {
  getAllNodes,
  createNode,
  editNode,
  deleteNode,
};
